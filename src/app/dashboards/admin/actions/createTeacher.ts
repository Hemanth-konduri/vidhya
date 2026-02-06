"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export async function createTeacher(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const photo = formData.get("photo") as File;

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
      .from('profile-photos')
      .upload(fileName, photo);

    if (!uploadError) {
      const { data: { publicUrl } } = supabaseAdmin.storage
        .from('profile-photos')
        .getPublicUrl(fileName);
      imageUrl = publicUrl;
    }
  }

  // Create profile record
  const { error: profileError } = await supabaseAdmin
    .from("profiles")
    .insert({
      id: data.user.id,
      role: "teacher",
      email: email
    });

  if (profileError) throw profileError;

  // Create teacher record
  const { error: teacherError } = await supabaseAdmin
    .from("teachers")
    .insert({
      id: data.user.id,
      name: formData.get("name"),
      employee_id: formData.get("employee_id"),
      qualification: formData.get("qualification"),
      experience: formData.get("experience") ? parseInt(formData.get("experience") as string) : null,
      department_id: formData.get("department_id") || null,
      designation: formData.get("designation"),
      joining_date: formData.get("joining_date") || null,
      phone: formData.get("phone"),
     
      image_url: imageUrl
    });

  if (teacherError) throw teacherError;
}