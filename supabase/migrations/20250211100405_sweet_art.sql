/*
  # Initial Schema Setup for Google Workspace Promo

  1. New Tables
    - `promo_codes`
      - Stores promo codes for both Business Starter and Business Standard
    - `user_claims`
      - Tracks which IPs have claimed which promo codes
    - `business_emails`
      - Stores collected business email addresses
  
  2. Security
    - Enable RLS on all tables
    - Add policies for secure access
*/

-- Create promo_codes table
CREATE TABLE IF NOT EXISTS promo_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL,
  type text NOT NULL CHECK (type IN ('starter', 'standard')),
  is_claimed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create user_claims table
CREATE TABLE IF NOT EXISTS user_claims (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address text NOT NULL,
  promo_code_id uuid REFERENCES promo_codes(id),
  type text NOT NULL CHECK (type IN ('starter', 'standard')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(ip_address, type)
);

-- Create business_emails table
CREATE TABLE IF NOT EXISTS business_emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_emails ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow read access to unclaimed promo codes" ON promo_codes
  FOR SELECT USING (NOT is_claimed);

CREATE POLICY "Allow read access to user claims" ON user_claims
  FOR SELECT USING (true);

CREATE POLICY "Allow insert to user claims" ON user_claims
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow insert to business emails" ON business_emails
  FOR INSERT WITH CHECK (true);
