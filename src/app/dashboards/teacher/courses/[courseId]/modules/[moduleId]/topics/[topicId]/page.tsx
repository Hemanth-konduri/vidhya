"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import {
  getTopicWithResources,
  getNextResourceOrder
} from "@/lib/supabase/queries/courseBuilder";
import {
  createResource,
  createAssignment,
  createQuiz
} from "@/app/dashboards/teacher/actions/courseBuilder";
import { supabase } from "@/lib/supabase/client";

import {
  ArrowLeft,
  FileText,
  Video,
  File,
  ClipboardList,
  HelpCircle,
  Edit,
  Trash2
} from "lucide-react";

import ResourceForm from "@/components/dashboards/teacher/courses/ResourceForm";
import AssignmentForm from "@/components/dashboards/teacher/courses/AssignmentForm";
import QuizForm from "@/components/dashboards/teacher/courses/QuizForm";

/* ================= TYPES ================= */

type Resource = {
  id: string;
  type: string;
  title: string;
  url: string | null;
};

type Assignment = {
  id: string;
  title: string;
  description: string;
  due_date: string | null;
  status: string;
};

type Quiz = {
  id: string;
  title: string;
  description: string;
  time_limit_minutes: number;
  attempts_allowed: number;
  due_date: string | null;
  status: string;
};

type Topic = {
  id: string;
  title: string;
  description: string;
  position: number;
  module_id: string;

  topic_resources: Resource[];
  assignments: Assignment[];
  quizzes: Quiz[];
};

/* ================= COMPONENT ================= */

export default function TopicDetailPage({
  params
}: {
  params: Promise<{ courseId: string; moduleId: string; topicId: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();

  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);

  const [showResourceForm, setShowResourceForm] = useState(false);
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [resourceType, setResourceType] = useState<string>("");

  useEffect(() => {
    loadTopic();
  }, [resolvedParams.topicId]);

  /* ================= LOAD TOPIC ================= */

  async function loadTopic() {
    try {
      const data = await getTopicWithResources(resolvedParams.topicId);
      console.log("Topic data:", data);
      setTopic(data);
    } catch (error) {
      console.error("Error loading topic FULL:", JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  }

  /* ================= CREATE RESOURCE ================= */

  async function handleCreateResource(formData: FormData) {
    const position = await getNextResourceOrder(resolvedParams.topicId);

    formData.append("topicId", resolvedParams.topicId);
    formData.append("courseId", resolvedParams.courseId);
    formData.append("moduleId", resolvedParams.moduleId);
    formData.append("position", position.toString());
    formData.append("type", resourceType); // ✅ FIXED

    const result = await createResource(formData);

    if (result.success) {
      setShowResourceForm(false);
      setResourceType("");
      loadTopic();
    }
  }

  /* ================= CREATE ASSIGNMENT ================= */

  async function handleCreateAssignment(formData: FormData) {
    const { data } = await supabase.auth.getUser();
    if (!data.user) return;

    formData.append("topicId", resolvedParams.topicId);
    formData.append("courseId", resolvedParams.courseId);
    formData.append("moduleId", resolvedParams.moduleId);
    formData.append("userId", data.user.id);

    const result = await createAssignment(formData);

    if (result.success) {
      setShowAssignmentForm(false);
      loadTopic();
    }
  }

  /* ================= CREATE QUIZ ================= */

  async function handleCreateQuiz(formData: FormData) {
    const { data } = await supabase.auth.getUser();
    if (!data.user) return;

    formData.append("topicId", resolvedParams.topicId);
    formData.append("courseId", resolvedParams.courseId);
    formData.append("moduleId", resolvedParams.moduleId);
    formData.append("userId", data.user.id);

    const result = await createQuiz(formData);

    if (result.success) {
      setShowQuizForm(false);
      loadTopic();
    }
  }

  /* ================= ICON ================= */

  function getResourceIcon(type: string) {
    switch (type) {
      case "text":
        return <FileText className="w-5 h-5" />;
      case "video":
        return <Video className="w-5 h-5" />;
      case "file":
        return <File className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  }

  /* ================= STATES ================= */

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!topic) {
    return <div className="p-6">Topic not found</div>;
  }

  /* ================= UI ================= */

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-2xl font-bold">{topic.title}</h1>
          <p className="text-gray-600">{topic.description}</p>
        </div>
      </div>

      {/* ADD BUTTONS */}
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => {
            setResourceType("text");
            setShowResourceForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add Text
        </button>

        <button
          onClick={() => {
            setResourceType("video");
            setShowResourceForm(true);
          }}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg"
        >
          Add Video
        </button>

        <button
          onClick={() => {
            setResourceType("file");
            setShowResourceForm(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Add File
        </button>

        <button
          onClick={() => setShowAssignmentForm(true)}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg"
        >
          Add Assignment
        </button>

        <button
          onClick={() => setShowQuizForm(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Add Quiz
        </button>
      </div>

      {/* RESOURCES */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Resources</h2>

        {topic.topic_resources.map((resource) => (
            <div key={resource.id} className="bg-white border p-5 rounded-lg">
              <div className="flex gap-4">
                {getResourceIcon(resource.type)}

                <div className="flex-1">
                  <h3 className="font-semibold">{resource.title}</h3>
                  <p className="text-sm capitalize text-gray-500">
                    {resource.type}
                  </p>

                  {resource.url && (
                    <a
                      href={resource.url}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      View File
                    </a>
                  )}
                </div>

                <div className="flex gap-2">
                  <Edit className="w-4 h-4" />
                  <Trash2 className="w-4 h-4 text-red-600" />
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* ASSIGNMENTS */}
      {topic.assignments.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold">Assignments</h2>
          {topic.assignments.map((a) => (
            <div key={a.id}>{a.title}</div>
          ))}
        </div>
      )}

      {/* QUIZZES */}
      {topic.quizzes.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold">Quizzes</h2>
          {topic.quizzes.map((q) => (
            <div key={q.id}>{q.title}</div>
          ))}
        </div>
      )}

      {/* FORMS */}
      {showResourceForm && (
        <ResourceForm
          resourceType={resourceType}
          onSubmit={handleCreateResource}
          onClose={() => {
            setShowResourceForm(false);
            setResourceType("");
          }}
        />
      )}

      {showAssignmentForm && (
        <AssignmentForm
          onSubmit={handleCreateAssignment}
          onClose={() => setShowAssignmentForm(false)}
        />
      )}

      {showQuizForm && (
        <QuizForm
          onSubmit={handleCreateQuiz}
          onClose={() => setShowQuizForm(false)}
        />
      )}

    </div>
  );
}