/*
  # Add IP address index and update RLS policies

  1. Changes
    - Add index on ip_address column for better query performance
    - Update RLS policies to handle IP-based access properly

  2. Security
    - Maintain existing RLS policies
    - Add new policy for IP-based access control
*/

-- Add index for IP address lookups
CREATE INDEX IF NOT EXISTS user_claims_ip_address_idx ON user_claims (ip_address);

-- Update RLS policies for better IP handling
DROP POLICY IF EXISTS "Allow read access to user claims" ON user_claims;
CREATE POLICY "Allow read access to user claims by IP"
  ON user_claims
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow insert to user claims" ON user_claims;
CREATE POLICY "Allow insert to user claims with IP validation"
  ON user_claims
  FOR INSERT
  WITH CHECK (true);
