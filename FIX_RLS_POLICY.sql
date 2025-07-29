-- FIX ROW LEVEL SECURITY FOR QUIZ_RESULTS TABLE
-- Execute this in your Supabase SQL Editor

-- Option 1: DISABLE Row Level Security (for testing/development)
-- This allows all operations on the table without restrictions
ALTER TABLE quiz_results DISABLE ROW LEVEL SECURITY;

-- Option 2: CREATE proper RLS policies (for production)
-- Uncomment the following if you want to keep RLS enabled with proper policies

-- First, enable RLS
-- ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to INSERT their own records
-- CREATE POLICY "Users can insert own quiz results" ON quiz_results
--   FOR INSERT 
--   WITH CHECK (usuario_id = auth.uid()::text);

-- Policy to allow users to SELECT their own records
-- CREATE POLICY "Users can view own quiz results" ON quiz_results
--   FOR SELECT 
--   USING (usuario_id = auth.uid()::text);

-- Policy to allow users to UPDATE their own records (optional)
-- CREATE POLICY "Users can update own quiz results" ON quiz_results
--   FOR UPDATE 
--   USING (usuario_id = auth.uid()::text)
--   WITH CHECK (usuario_id = auth.uid()::text);

-- Policy to allow users to DELETE their own records (optional)
-- CREATE POLICY "Users can delete own quiz results" ON quiz_results
--   FOR DELETE 
--   USING (usuario_id = auth.uid()::text);

-- Test the setup by checking current RLS status
SELECT schemaname, tablename, rowsecurity, hasrlspolicy 
FROM pg_tables t
LEFT JOIN pg_class c ON c.relname = t.tablename
WHERE tablename = 'quiz_results';

-- Show current policies (if any)
SELECT policyname, cmd, permissive, roles, qual, with_check
FROM pg_policies 
WHERE tablename = 'quiz_results';
