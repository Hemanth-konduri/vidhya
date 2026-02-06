"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export async function createDepartment(formData: FormData) {
  const { error } = await supabaseAdmin
    .from("departments")
    .insert({
      name: formData.get("name"),
      program_id: formData.get("program_id")
    });

  if (error) throw error;
}