-- Create a stored procedure for claiming promo codes
-- This ensures the operation is atomic (transaction-based)
CREATE OR REPLACE FUNCTION claim_promo_code(
  p_code_id UUID,
  p_ip_address TEXT,
  p_type TEXT,
  p_region TEXT,
  p_email TEXT DEFAULT NULL
) RETURNS BOOLEAN AS $$
DECLARE
  v_success BOOLEAN;
BEGIN
  -- Start transaction
  BEGIN
    -- Mark the promo code as claimed
    UPDATE promo_codes
    SET is_claimed = TRUE
    WHERE id = p_code_id AND is_claimed = FALSE;
    
    -- If no rows were updated, the code was already claimed
    IF NOT FOUND THEN
      RETURN FALSE;
    END IF;
    
    -- Insert into user_claims
    INSERT INTO user_claims (
      ip_address,
      promo_code_id,
      type,
      region
    ) VALUES (
      p_ip_address,
      p_code_id,
      p_type,
      p_region
    );
    
    -- If email provided, store it
    IF p_email IS NOT NULL THEN
      INSERT INTO business_emails (email)
      VALUES (p_email)
      ON CONFLICT DO NOTHING;
    END IF;
    
    v_success := TRUE;
  EXCEPTION
    WHEN OTHERS THEN
      -- Roll back transaction on error
      RAISE;
      v_success := FALSE;
  END;
  
  RETURN v_success;
END;
$$ LANGUAGE plpgsql;

-- Add policy to allow executing the function
GRANT EXECUTE ON FUNCTION claim_promo_code TO service_role;
