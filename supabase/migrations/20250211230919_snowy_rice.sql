/*
  # Update user claims policies for multiple codes

  1. Changes
    - Drop existing unique constraint on user_claims
    - Add new constraint to limit users to 3 codes per plan/region
    - Update RLS policies for better claim handling

  2. Security
    - Maintain RLS enabled
    - Update policies to enforce the 3-code limit
*/

-- Drop existing unique constraint
ALTER TABLE user_claims 
DROP CONSTRAINT IF EXISTS user_claims_ip_address_type_region_key;

-- Create a function to check claim limit
CREATE OR REPLACE FUNCTION check_claim_limit()
RETURNS TRIGGER AS $$
BEGIN
  IF (
    SELECT COUNT(*)
    FROM user_claims
    WHERE ip_address = NEW.ip_address
    AND type = NEW.type
    AND region = NEW.region
  ) >= 3 THEN
    RAISE EXCEPTION 'User has reached the maximum limit of 3 claims for this plan and region';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to enforce claim limit
DROP TRIGGER IF EXISTS enforce_claim_limit ON user_claims;
CREATE TRIGGER enforce_claim_limit
  BEFORE INSERT ON user_claims
  FOR EACH ROW
  EXECUTE FUNCTION check_claim_limit();

-- Update RLS policies for better claim handling
DROP POLICY IF EXISTS "Allow read access to user claims by IP" ON user_claims;
CREATE POLICY "Allow read access to user claims by IP"
  ON user_claims
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow insert to user claims with IP validation" ON user_claims;
CREATE POLICY "Allow insert to user claims with claim limit"
  ON user_claims
  FOR INSERT
  WITH CHECK (true);

-- Add index for faster claim limit checking
CREATE INDEX IF NOT EXISTS idx_user_claims_ip_type_region 
ON user_claims(ip_address, type, region);
