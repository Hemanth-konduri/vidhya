"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export async function createTopic(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const moduleId = formData.get("moduleId") as string;
    const position = parseInt(formData.get("position") as string);

    const { data, error } = await supabaseAdmin
      .from("course_topics")
      .insert({
        title,
        description,
        module_id: moduleId,
        position
      })
      .select()
      .single();

    if (error) throw error;

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateTopic(formData: FormData) {
  try {
    const topicId = formData.get("topicId") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    const { data, error } = await supabaseAdmin
      .from("course_topics")
      .update({
        title,
        description
      })
      .eq("id", topicId)
      .select()
      .single();

    if (error) throw error;

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createResource(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const type = formData.get("type") as string;
    const url = formData.get("url") as string;
    const topicId = formData.get("topicId") as string;
    const position = parseInt(formData.get("position") as string);

    const { data, error } = await supabaseAdmin
      .from("topic_resources")
      .insert({
        title,
        description,
        type,
        url,
        topic_id: topicId,
        position
      })
      .select()
      .single();

    if (error) throw error;

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createAssignment(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const dueDate = formData.get("dueDate") as string;
    const topicId = formData.get("topicId") as string;
    const position = parseInt(formData.get("position") as string);

    const { data, error } = await supabaseAdmin
      .from("topic_assignments")
      .insert({
        title,
        description,
        due_date: dueDate,
        topic_id: topicId,
        position
      })
      .select()
      .single();

    if (error) throw error;

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createQuiz(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const timeLimit = parseInt(formData.get("timeLimit") as string);
    const topicId = formData.get("topicId") as string;
    const position = parseInt(formData.get("position") as string);

    const { data, error } = await supabaseAdmin
      .from("topic_quizzes")
      .insert({
        title,
        description,
        time_limit: timeLimit,
        topic_id: topicId,
        position
      })
      .select()
      .single();

    if (error) throw error;

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}



// ================================
// MODULE ACTIONS
// ================================

export async function createModule(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const courseId = formData.get("courseId") as string;
    const position = parseInt(formData.get("position") as string);

    const { data, error } = await supabaseAdmin
      .from("course_modules")
      .insert({
        title,
        description,
        course_id: courseId,
        position
      })
      .select()
      .single();

    if (error) throw error;

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateModule(formData: FormData) {
  try {
    const moduleId = formData.get("moduleId") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    const { data, error } = await supabaseAdmin
      .from("course_modules")
      .update({
        title,
        description
      })
      .eq("id", moduleId)
      .select()
      .single();

    if (error) throw error;

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteModule(moduleId: string) {
  try {
    const { error } = await supabaseAdmin
      .from("course_modules")
      .delete()
      .eq("id", moduleId);

    if (error) throw error;

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}