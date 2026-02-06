"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export async function assignTeacherToCourse(formData: FormData) {
  const teacherId = formData.get("teacher_id");
  const courseId = formData.get("course_id");

  // Update course with instructor
  const { error: courseError } = await supabaseAdmin
    .from("courses")
    .update({ instructor_id: teacherId })
    .eq("id", courseId);

  if (courseError) throw courseError;

  // Also add to teacher_courses junction table
  const { error: junctionError } = await supabaseAdmin
    .from("teacher_courses")
    .insert({
      teacher_id: teacherId,
      course_id: courseId
    });

  if (junctionError) throw junctionError;
}