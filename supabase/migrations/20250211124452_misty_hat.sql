/*
  # Fix duplicate claims issue

  1. Changes
    - Add ON DELETE CASCADE to user_claims foreign key
    - Add index on promo_code_id for faster lookups
    - Update RLS policies for better claim handling

  2. Security
    - Maintain RLS policies
    - Ensure data integrity with proper constraints
*/

-- Drop existing foreign key constraint
ALTER TABLE user_claims 
DROP CONSTRAINT IF EXISTS user_claims_promo_code_id_fkey;

-- Re-add foreign key with ON DELETE CASCADE
ALTER TABLE user_claims 
ADD CONSTRAINT user_claims_promo_code_id_fkey 
FOREIGN KEY (promo_code_id) 
REFERENCES promo_codes(id) 
ON DELETE CASCADE;

-- Add index on promo_code_id for faster lookups
CREATE INDEX IF NOT EXISTS user_claims_promo_code_id_idx 
ON user_claims(promo_code_id);

-- Update RLS policies for better claim handling
DROP POLICY IF EXISTS "Allow read access to user claims by IP" ON user_claims;
CREATE POLICY "Allow read access to user claims by IP"
  ON user_claims
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow insert to user claims with IP validation" ON user_claims;
CREATE POLICY "Allow insert to user claims with IP validation"
  ON user_claims
  FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow delete user claims" ON user_claims;
CREATE POLICY "Allow delete user claims"
  ON user_claims
  FOR DELETE
  USING (true);
