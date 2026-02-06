"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getModuleWithTopics,
  getNextTopicOrder
} from "@/lib/supabase/queries/courseBuilder";

import {
  createTopic,
  updateTopic
} from "@/app/dashboards/teacher/actions/courseBuilder";

import {
  ArrowLeft,
  Plus,
  FileText,
  Edit,
  Trash2
} from "lucide-react";

import TopicForm from "@/components/dashboards/teacher/courses/TopicForm";


// ----------------------------------
// Types
// ----------------------------------

type Topic = {
  id: string;
  title: string;
  description: string;
  position: number;
  created_at: string;
};

type Module = {
  id: string;
  title: string;
  description: string;
  position: number;
  course_id: string;
  course_topics: Topic[];
};


// ----------------------------------
// Page
// ----------------------------------

export default function ModuleDetailPage({
  params
}: {
  params: Promise<{ courseId: string; moduleId: string }>
}) {

  // ✅ UNWRAP PARAMS
  const { courseId, moduleId } = use(params);

  const router = useRouter();

  const [module, setModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTopicForm, setShowTopicForm] = useState(false);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);

  // ----------------------------------
  // Load module
  // ----------------------------------

  useEffect(() => {
    loadModule();
  }, [moduleId]);

  async function loadModule() {
    try {
      const data = await getModuleWithTopics(moduleId);
      setModule(data);
    } catch (error) {
     console.error("Error loading module FULL:", JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  }

  // ----------------------------------
  // Create Topic
  // ----------------------------------

  async function handleCreateTopic(formData: FormData) {
    try {
      const position = await getNextTopicOrder(moduleId);

      formData.append("moduleId", moduleId);
      formData.append("courseId", courseId);
      formData.append("position", position.toString());

      console.log("Creating topic with data:", {
        title: formData.get("title"),
        description: formData.get("description"),
        moduleId,
        courseId,
        position
      });

      const result = await createTopic(formData);

      console.log("Create topic result:", result);

      if (result.success) {
        setShowTopicForm(false);
        await loadModule();
      } else {
        alert("Failed to create topic: " + result.error);
      }
    } catch (error) {
      console.error("Error creating topic:", error);
      alert("Failed to create topic");
    }
  }

  // ----------------------------------
  // Update Topic
  // ----------------------------------

  async function handleUpdateTopic(formData: FormData) {
    if (!editingTopic) return;

    formData.append("topicId", editingTopic.id);
    formData.append("moduleId", moduleId);
    formData.append("courseId", courseId);

    const result = await updateTopic(formData);

    if (result.success) {
      setEditingTopic(null);
      loadModule();
    }
  }

  // ----------------------------------
  // Loading State
  // ----------------------------------

  if (loading) {
    return (
      <div className="p-6 animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/3" />
        <div className="h-32 bg-gray-200 rounded" />
      </div>
    );
  }

  if (!module) {
    return (
      <div className="p-6 text-center text-gray-600">
        Module not found
      </div>
    );
  }

  // ----------------------------------
  // UI
  // ----------------------------------

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex-1">
          <h1 className="text-2xl font-bold">{module.title}</h1>
          <p className="text-gray-600">{module.description}</p>
        </div>

        <button
          onClick={() => setShowTopicForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Topic
        </button>
      </div>

      {/* Topics */}
      <div className="space-y-4">

        {module.course_topics
          .sort((a, b) => a.position - b.position)
          .map((topic) => (

            <div
              key={topic.id}
              className="bg-white rounded-xl border p-6"
            >
              <div className="flex justify-between">

                {/* Left */}
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() =>
                    router.push(
                      `/dashboards/teacher/courses/${courseId}/modules/${moduleId}/topics/${topic.id}`
                    )
                  }
                >
                  <h3 className="text-lg font-semibold hover:text-blue-600">
                    {topic.title}
                  </h3>

                  <p className="text-gray-600 mt-1">
                    {topic.description}
                  </p>

                  <div className="flex gap-4 text-sm text-gray-500 mt-2">
                    <span className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      0 resources
                    </span>
                    <span>0 assignments</span>
                    <span>0 quizzes</span>
                    <span>Order: {topic.position}</span>
                  </div>
                </div>

                {/* Right */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingTopic(topic)}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    className="p-2 hover:bg-red-100 rounded"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>

              </div>
            </div>

          ))}

      </div>

      {/* Empty State */}
      {module.course_topics.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium">No topics yet</h3>
          <p className="text-gray-600 mb-4">
            Start adding topics to this module.
          </p>
          <button
            onClick={() => setShowTopicForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Add First Topic
          </button>
        </div>
      )}

      {/* Modal */}
      {(showTopicForm || editingTopic) && (
        <TopicForm
          topic={editingTopic}
          onSubmit={editingTopic ? handleUpdateTopic : handleCreateTopic}
          onClose={() => {
            setShowTopicForm(false);
            setEditingTopic(null);
          }}
        />
      )}

    </div>
  );
}
