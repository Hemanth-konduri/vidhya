"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export async function assignStudentToBatch(formData: FormData) {
  const studentId = formData.get("student_id");
  const batchId = formData.get("batch_id");

  const { error } = await supabaseAdmin
    .from("students")
    .update({ batch_id: batchId })
    .eq("id", studentId);

  if (error) throw error;
}