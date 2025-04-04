/*
  # Update promo codes RLS policies
  
  1. Changes
    - Add RLS policy to allow specific admin user to insert promo codes
    - Add RLS policy to allow specific admin user to delete promo codes
    - Update existing RLS policy for selecting promo codes
  
  2. Security
    - Only user with ID d38b6b3e-189c-47ce-b6a6-48187d160ebd can insert/delete promo codes
    - All users can view unclaimed promo codes
*/

-- Drop existing select policy
DROP POLICY IF EXISTS "Allow read access to unclaimed promo codes" ON promo_codes;

-- Create new select policy
CREATE POLICY "Allow read access to promo codes"
  ON promo_codes
  FOR SELECT
  USING (
    NOT is_claimed 
    OR 
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE user_id = auth.uid() 
      AND user_id = 'd38b6b3e-189c-47ce-b6a6-48187d160ebd'
    )
  );

-- Create insert policy for specific admin
CREATE POLICY "Allow specific admin to insert promo codes"
  ON promo_codes
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE user_id = auth.uid() 
      AND user_id = 'd38b6b3e-189c-47ce-b6a6-48187d160ebd'
    )
  );

-- Create delete policy for specific admin
CREATE POLICY "Allow specific admin to delete promo codes"
  ON promo_codes
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE user_id = auth.uid() 
      AND user_id = 'd38b6b3e-189c-47ce-b6a6-48187d160ebd'
    )
  );
