import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

////////////////////////////////////////////////////
// GET TEACHER COURSES
////////////////////////////////////////////////////

export async function getTeacherCourses(teacherId: string) {
  const { data, error } = await supabase
    .from("courses")
    .select(`
      id,
      title,
      description,
      status,
      created_at,
      course_modules (
        id
      )
    `)
    .eq("instructor_id", teacherId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

////////////////////////////////////////////////////
// GET COURSE WITH MODULES
////////////////////////////////////////////////////

export async function getCourseWithModules(courseId: string) {
  const { data, error } = await supabase
    .from("courses")
    .select(`
      id,
      title,
      description,
      status,
      course_modules (
        id,
        title,
        description,
        position,
        created_at
      )
    `)
    .eq("id", courseId)
    .single();

  if (error) throw error;
  return data;
}

////////////////////////////////////////////////////
// GET MODULE WITH TOPICS
////////////////////////////////////////////////////

export async function getModuleWithTopics(moduleId: string) {

  console.log("Fetching module:", moduleId);

  // Fetch module
  const { data: module, error: moduleError } = await supabase
    .from("course_modules")
    .select(`
      id,
      title,
      description,
      position,
      course_id
    `)
    .eq("id", moduleId)
    .single();

  if (moduleError) {
    console.error("Module fetch error:", moduleError);
    throw moduleError;
  }

  // Fetch topics
  const { data: topics, error: topicsError } = await supabase
    .from("course_topics")
    .select(`
      id,
      title,
      description,
      position,
      created_at
    `)
    .eq("module_id", moduleId)
    .order("position", { ascending: true });

  if (topicsError) {
    console.error("Topics fetch error:", topicsError);
    throw topicsError;
  }

  return {
    ...module,
    course_topics: topics || []
  };
}


////////////////////////////////////////////////////
// GET TOPIC WITH RESOURCES
////////////////////////////////////////////////////

export async function getTopicWithResources(topicId: string) {
  const { data, error } = await supabase
    .from("course_topics")
    .select(`
      id,
      title,
      description,
      position,
      module_id,

      topic_resources (
        id,
        type,
        title,
        url
      ),

      assignments (
        id,
        title,
        description,
        due_date
      ),

      quizzes (
        id,
        title,
        time_limit
      )
    `)
    .eq("id", topicId)
    .single();

  if (error) throw error;
  return data;
}


////////////////////////////////////////////////////
// NEXT POSITION HELPERS
////////////////////////////////////////////////////

export async function getNextModuleOrder(courseId: string) {
  const { data, error } = await supabase
    .from("course_modules")
    .select("position")
    .eq("course_id", courseId)
    .order("position", { ascending: false })
    .limit(1);

  if (error) throw error;
  return (data?.[0]?.position || 0) + 1;
}

export async function getNextTopicOrder(moduleId: string) {
  const { data, error } = await supabase
    .from("course_topics")
    .select("position")
    .eq("module_id", moduleId)
    .order("position", { ascending: false })
    .limit(1);

  if (error) throw error;
  return (data?.[0]?.position || 0) + 1;
}

export async function getNextResourceOrder(topicId: string) {
  const { data } = await supabase
    .from("topic_resources")
    .select("position")
    .eq("topic_id", topicId)
    .order("position", { ascending: false })
    .limit(1)
    .single();

  return data ? data.position + 1 : 1;
}
