"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export async function assignStudentsToBatch(formData: FormData) {
  const batchId = formData.get("batch_id") as string;
  const studentIds = formData.getAll("student_ids") as string[];

  if (!batchId || studentIds.length === 0) {
    throw new Error("Batch ID and student IDs are required");
  }

  // ✅ Update STUDENTS table (not profiles)
  const { error } = await supabaseAdmin
    .from("students")
    .update({ batch_id: batchId })
    .in("id", studentIds);

  if (error) {
    throw new Error(`Failed to assign students: ${error.message}`);
  }

  return { success: true };
}
