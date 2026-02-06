-- Database setup for student-batch assignment

-- 1. Ensure batches table exists and has data
CREATE TABLE IF NOT EXISTS batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2. Add batch_id to profiles table if not exists
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS batch_id UUID REFERENCES batches(id);

-- 3. Insert sample batches
INSERT INTO batches (name) VALUES 
('CSE Batch 2024'),
('ECE Batch 2024'),
('ME Batch 2024'),
('CE Batch 2024')
ON CONFLICT (name) DO NOTHING;

-- 4. Check what columns exist in profiles table
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'profiles' 
ORDER BY ordinal_position;

-- 5. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_batch_id ON profiles(batch_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_roll_no ON profiles(roll_no);

-- 6. Check current data
SELECT 'Batches:' as info, COUNT(*) as count FROM batches;
SELECT id, name FROM batches LIMIT 5;

SELECT 'Students:' as info, COUNT(*) as count FROM profiles WHERE role = 'student';
SELECT id, email, roll_no, batch_id FROM profiles WHERE role = 'student' LIMIT 10;