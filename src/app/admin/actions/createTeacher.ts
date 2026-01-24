"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export async function createTeacher(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const teacherId = formData.get("teacher_id") as string;

  if (!email || !password || !teacherId) {
    throw new Error("All fields are required");
  }

  // Create auth user
  const { data, error: authError } =
    await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

  if (authError) throw new Error(authError.message);

  // Insert profile
  const { error: profileError } = await supabaseAdmin
    .from("profiles")
    .insert({
      id: data.user.id,
      role: "teacher",
      email,
      teacher_id: teacherId,
    });

  if (profileError) throw new Error(profileError.message);

  return { success: true };
}