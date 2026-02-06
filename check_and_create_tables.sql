-- Check what tables exist and create missing ones

-- 1. Check existing tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- 2. Create courses table if it doesn't exist
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  code VARCHAR UNIQUE,
  credits INTEGER DEFAULT 3,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. Insert sample courses
INSERT INTO courses (name, code, credits) VALUES 
('Database Management Systems', 'CS301', 4),
('Operating Systems', 'CS302', 3),
('Data Structures', 'CS201', 4),
('Computer Networks', 'CS401', 3),
('Software Engineering', 'CS402', 3)
ON CONFLICT (code) DO NOTHING;

-- 4. Check if we have teacher profiles
SELECT COUNT(*) as teacher_count FROM profiles WHERE role = 'teacher';

-- 5. Create sample teacher if none exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM profiles WHERE role = 'teacher' LIMIT 1) THEN
    INSERT INTO profiles (id, email, role, roll_no) VALUES 
    (gen_random_uuid(), 'teacher1@college.edu', 'teacher', 'T001'),
    (gen_random_uuid(), 'teacher2@college.edu', 'teacher', 'T002'),
    (gen_random_uuid(), 'teacher3@college.edu', 'teacher', 'T003');
  END IF;
END $$;

-- 6. Check classes table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'classes' 
ORDER BY ordinal_position;

-- 7. Insert sample classes if table exists and is empty
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'classes') THEN
    IF NOT EXISTS (SELECT 1 FROM classes LIMIT 1) THEN
      -- Get some batch and teacher IDs
      INSERT INTO classes (batch_id, semester, status, class_teacher_id)
      SELECT 
        b.id as batch_id,
        '1' as semester,
        'active' as status,
        p.id as class_teacher_id
      FROM batches b
      CROSS JOIN (SELECT id FROM profiles WHERE role = 'teacher' LIMIT 1) p
      LIMIT 3;
    END IF;
  END IF;
END $$;

-- 8. Final check - show counts
SELECT 'Profiles (Students)' as table_name, COUNT(*) as count FROM profiles WHERE role = 'student'
UNION ALL
SELECT 'Profiles (Teachers)', COUNT(*) FROM profiles WHERE role = 'teacher'
UNION ALL
SELECT 'Batches', COUNT(*) FROM batches
UNION ALL
SELECT 'Courses', COUNT(*) FROM courses
UNION ALL
SELECT 'Classes', COALESCE((SELECT COUNT(*) FROM classes), 0);