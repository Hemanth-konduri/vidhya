"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import {
  getCourseWithModules,
  getNextModuleOrder,
} from "@/lib/supabase/queries/courseBuilder";
import {
  createModule,
  updateModule,
  deleteModule,
} from "../../actions/courseBuilder";
import { supabase } from "@/lib/supabase/client";
import { ArrowLeft, Plus, BookOpen, Edit, Trash2 } from "lucide-react";
import ModuleForm from "@/components/dashboards/teacher/courses/ModuleForm";

/* ---------------- TYPES ---------------- */

type Module = {
  id: string;
  title: string;
  description: string | null;
  position: number;
  created_at: string;
};

type Course = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  course_modules: Module[];
};

/* ---------------- PAGE ---------------- */

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModuleForm, setShowModuleForm] = useState(false);
  const [editingModule, setEditingModule] = useState<Module | null>(null);

  /* ------------ LOAD COURSE ------------ */

  useEffect(() => {
    async function loadCourse() {
      try {
        const data = await getCourseWithModules(resolvedParams.courseId);
        setCourse(data);
      } catch (error) {
        console.error("Error loading course:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCourse();
  }, [resolvedParams.courseId]);

  /* ------------ CREATE MODULE ------------ */

  async function handleCreateModule(formData: FormData) {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return;

    const nextPosition = await getNextModuleOrder(resolvedParams.courseId);

    formData.append("courseId", resolvedParams.courseId);
    formData.append("position", nextPosition.toString());
    formData.append("userId", auth.user.id);

    const result = await createModule(formData);

    if (result.success) {
      setShowModuleForm(false);
      const data = await getCourseWithModules(resolvedParams.courseId);
      setCourse(data);
    }
  }

  /* ------------ UPDATE MODULE ------------ */

  async function handleUpdateModule(formData: FormData) {
    if (!editingModule) return;

    formData.append("moduleId", editingModule.id);
    formData.append("courseId", resolvedParams.courseId);

    const result = await updateModule(formData);

    if (result.success) {
      setEditingModule(null);
      const data = await getCourseWithModules(resolvedParams.courseId);
      setCourse(data);
    }
  }

  /* ------------ DELETE MODULE ------------ */

  async function handleDeleteModule(moduleId: string) {
    if (!confirm("Delete this module?")) return;

    const result = await deleteModule(moduleId, resolvedParams.courseId);

    if (result.success) {
      const data = await getCourseWithModules(resolvedParams.courseId);
      setCourse(data);
    }
  }

  /* ------------ UI STATES ------------ */

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!course) {
    return <div className="p-6">Course not found</div>;
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded"
        >
          <ArrowLeft />
        </button>

        <div className="flex-1">
          <h1 className="text-2xl font-bold">{course.title}</h1>
          <p className="text-gray-600">{course.description}</p>
        </div>

        <button
          onClick={() => setShowModuleForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={18} />
          Add Module
        </button>
      </div>

      {/* MODULES LIST */}
      <div className="space-y-4">

        {course.course_modules
          .sort((a, b) => a.position - b.position)
          .map((module) => (
            <div
              key={module.id}
              className="bg-white border rounded-xl p-5"
            >
              <div className="flex justify-between">

                <div
                  className="flex-1 cursor-pointer"
                  onClick={() =>
                    router.push(
                      `/dashboards/teacher/courses/${resolvedParams.courseId}/modules/${module.id}`
                    )
                  }
                >
                  <h3 className="text-lg font-semibold">
                    {module.title}
                  </h3>

                  {module.description && (
                    <p className="text-gray-600 mt-1">
                      {module.description}
                    </p>
                  )}

                  <div className="text-sm text-gray-500 mt-2 flex gap-4">
                    <span className="flex items-center gap-1">
                      <BookOpen size={14} />
                      0 Topics
                    </span>
                    <span>Order: {module.position}</span>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingModule(module)}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <Edit size={16} />
                  </button>

                  <button
                    onClick={() => handleDeleteModule(module.id)}
                    className="p-2 hover:bg-red-100 rounded"
                  >
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}

        {/* EMPTY STATE */}
        {course.course_modules.length === 0 && (
          <div className="bg-white border rounded-xl p-12 text-center">
            <BookOpen size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="font-medium">No modules yet</p>
            <button
              onClick={() => setShowModuleForm(true)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add First Module
            </button>
          </div>
        )}
      </div>

      {/* MODAL */}
      {(showModuleForm || editingModule) && (
        <ModuleForm
          module={editingModule}
          onSubmit={editingModule ? handleUpdateModule : handleCreateModule}
          onClose={() => {
            setShowModuleForm(false);
            setEditingModule(null);
          }}
        />
      )}
    </div>
  );
}
