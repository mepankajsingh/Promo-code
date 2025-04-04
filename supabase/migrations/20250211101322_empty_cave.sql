/*
  # Add region support to promo codes

  1. Changes
    - Add region column to promo_codes table
    - Add region to user_claims unique constraint
    - Update policies to handle regions

  2. New Columns
    - region (text) in promo_codes table with check constraint for valid regions
*/

-- Add region column to promo_codes
ALTER TABLE promo_codes 
ADD COLUMN region text NOT NULL DEFAULT 'americas' 
CHECK (region IN ('americas', 'asia_pacific', 'emea'));

-- Drop existing unique constraint on user_claims
ALTER TABLE user_claims 
DROP CONSTRAINT IF EXISTS user_claims_ip_address_type_key;

-- Add new unique constraint including region
ALTER TABLE user_claims 
ADD CONSTRAINT user_claims_ip_address_type_region_key 
UNIQUE (ip_address, type, region);

-- Add region column to user_claims
ALTER TABLE user_claims 
ADD COLUMN region text NOT NULL DEFAULT 'americas' 
CHECK (region IN ('americas', 'asia_pacific', 'emea'));
