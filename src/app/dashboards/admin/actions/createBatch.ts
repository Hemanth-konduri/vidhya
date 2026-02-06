"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export async function createBatch(formData: FormData) {
  const { error } = await supabaseAdmin
    .from("batches")
    .insert({
      department_id: formData.get("department_id"),
      name: formData.get("name"),
      max_students: parseInt(formData.get("max_students") as string)
    });

  if (error) throw error;
}