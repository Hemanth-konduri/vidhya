"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export async function createStudent(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const photo = formData.get("photo") as File;

  // Check if user already exists and delete if found
  const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
  const existingUser = existingUsers.users.find(user => user.email === email);
  
  if (existingUser) {
    await supabaseAdmin.auth.admin.deleteUser(existingUser.id);
  }

  // Create auth user
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  });

  if (error) throw error;

  let imageUrl = null;

  // Upload image if provided
  if (photo && photo.size > 0) {
    const fileExt = photo.name.split('.').pop();
    const fileName = `${data.user.id}.${fileExt}`;
    
    const { error: uploadError } = await supabaseAdmin.storage
      .from('profiles')
      .upload(fileName, photo);

    if (uploadError) {
      console.error('Upload error:', uploadError);
    } else {
      const { data: { publicUrl } } = supabaseAdmin.storage
        .from('profiles')
        .getPublicUrl(fileName);
      imageUrl = publicUrl;
    }
  }

  // Create profile record
  const { error: profileError } = await supabaseAdmin
    .from("profiles")
    .insert({
      id: data.user.id,
      role: "student",
      email: email
    });

  if (profileError) throw profileError;

  // Create student record
  const { error: studentError } = await supabaseAdmin
    .from("students")
    .insert({
      id: data.user.id,
      name: formData.get("name"),
      roll_no: formData.get("roll_no"),
      gender: formData.get("gender") || null,
      dob: formData.get("dob") || null,
      address: formData.get("address") || null,
      department_id: formData.get("department_id") || null,
      phone: formData.get("phone") || null,
      email,
      image_url: imageUrl,
      batch_id: formData.get("batch_id") || null
    });

  if (studentError) throw studentError;
}