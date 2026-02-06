"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export async function createProgram(formData: FormData) {
  const { error } = await supabaseAdmin
    .from("programs")
    .insert({
      name: formData.get("name")
    });

  if (error) throw error;
}