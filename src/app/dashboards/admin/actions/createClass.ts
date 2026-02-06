"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export async function createClass(formData: FormData) {
  const { error } = await supabaseAdmin
    .from("classes")
    .insert({
      batch_id: formData.get("batch_id"),
      class_teacher_id: formData.get("class_teacher_id") || null,
      semester: formData.get("semester") || "1",
      status: formData.get("status") || "active"
    });

  if (error) throw error;
}