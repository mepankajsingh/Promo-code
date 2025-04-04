/*
  # Add region support to promo codes

  1. Changes
    - Add region column to promo_codes and user_claims tables
    - Update unique constraint to include region
    - Add check constraints for valid regions

  2. New Columns
    - region (text) in promo_codes and user_claims tables
*/

-- Add region column to promo_codes
ALTER TABLE promo_codes 
ADD COLUMN region text NOT NULL DEFAULT 'americas' 
CHECK (region IN ('americas', 'asia_pacific', 'emea'));

-- Add region column to user_claims first
ALTER TABLE user_claims 
ADD COLUMN region text NOT NULL DEFAULT 'americas' 
CHECK (region IN ('americas', 'asia_pacific', 'emea'));

-- Now that the column exists, we can modify the constraint
ALTER TABLE user_claims 
DROP CONSTRAINT IF EXISTS user_claims_ip_address_type_key;

-- Add new unique constraint including region
ALTER TABLE user_claims 
ADD CONSTRAINT user_claims_ip_address_type_region_key 
UNIQUE (ip_address, type, region);
