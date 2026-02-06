"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export async function createCourse(formData: FormData) {
  const { error } = await supabaseAdmin
    .from("courses")
    .insert({
      course_code: formData.get("course_code"),
      title: formData.get("title"),
      department_id: formData.get("department_id") || null,
      credits: formData.get("credits") ? parseInt(formData.get("credits") as string) : null,
      description: formData.get("description") || null,
      prerequisites: formData.get("prerequisites") || null,
      instructor_id: formData.get("instructor_id") || null,
      status: formData.get("status") || "draft"
    });

  if (error) throw error;
}