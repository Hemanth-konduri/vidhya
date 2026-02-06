"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export async function sendNotification(formData: FormData) {
  const title = formData.get("title") as string;
  const message = formData.get("message") as string;
  const recipientType = formData.get("recipientType") as string;
  const recipientId = formData.get("recipientId") as string;
  const scheduleType = formData.get("scheduleType") as string;
  const scheduledTime = formData.get("scheduledTime") as string;

  // Create notification record
  const { data: notification, error: notificationError } = await supabaseAdmin
    .from("notifications")
    .insert({
      title,
      message,
      recipient_type: recipientType,
      recipient_id: recipientId || null,
      status: scheduleType === "now" ? "sent" : "scheduled",
      scheduled_time: scheduleType === "later" ? scheduledTime : null,
    })
    .select()
    .single();

  if (notificationError) throw notificationError;

  // Get target users based on recipient type
  let targetUsers: any[] = [];

  switch (recipientType) {
    case "everyone":
      const { data: allUsers } = await supabaseAdmin
        .from("profiles")
        .select("id");
      targetUsers = allUsers || [];
      break;

    case "department":
      const { data: deptUsers } = await supabaseAdmin
        .from("students")
        .select("id")
        .eq("department_id", recipientId);
      targetUsers = deptUsers || [];
      break;

    case "batch":
      const { data: batchUsers } = await supabaseAdmin
        .from("students")
        .select("id")
        .eq("batch_id", recipientId);
      targetUsers = batchUsers || [];
      break;

    case "individual":
      const { data: user } = await supabaseAdmin
        .from("profiles")
        .select("id")
        .or(`email.eq.${recipientId},id.eq.${recipientId}`)
        .single();
      if (user) targetUsers = [user];
      break;
  }

  // Create user_notifications for each target user
  if (targetUsers.length > 0) {
    const userNotifications = targetUsers.map(user => ({
      notification_id: notification.id,
      user_id: user.id,
    }));

    const { error: userNotificationError } = await supabaseAdmin
      .from("user_notifications")
      .insert(userNotifications);

    if (userNotificationError) throw userNotificationError;
  }

  return { success: true, notificationId: notification.id };
}