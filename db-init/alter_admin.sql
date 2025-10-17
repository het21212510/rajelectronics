ALTER TABLE users
  ADD COLUMN IF NOT EXISTS is_admin TINYINT(1) NOT NULL DEFAULT 0;

-- Mark an existing user as admin by email (run separately and replace the email as needed):
-- UPDATE users SET is_admin = 1 WHERE email = 'admin@example.com';
