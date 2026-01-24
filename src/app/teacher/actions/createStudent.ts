"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export async function createStudent(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const rollNo = formData.get("roll_no") as string;

  if (!email || !password || !rollNo) {
    throw new Error("All fields are required");
  }

  // 1️⃣ Create auth user
  const { data, error: authError } =
    await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

  if (authError) throw new Error(authError.message);

  // 2️⃣ Insert profile
  const { error: profileError } = await supabaseAdmin
    .from("profiles")
    .insert({
      id: data.user.id,
      role: "student",
      email,
      roll_no: rollNo,
    });

  if (profileError) throw new Error(profileError.message);

  return { success: true };
}