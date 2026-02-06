"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { assignTeacherToCourse } from "../../actions/assignTeacherToCourse";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export default function AssignTeacherToCoursePage() {
  const router = useRouter();
  const [teachers, setTeachers] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const [teacherData, courseData] = await Promise.all([
        supabase.from("teachers").select("id, name, employee_id").order("name"),
        supabase.from("courses").select("id, title, course_code").order("title")
      ]);
      setTeachers(teacherData.data || []);
      setCourses(courseData.data || []);
    }
    fetchData();
  }, []);

  async function submit(fd: FormData) {
    try {
      await assignTeacherToCourse(fd);
      router.push("/dashboards/admin/courses");
    } catch (error: any) {
      alert("Error: " + error.message);
    }
  }

  return (
    <div className="space-y-8 pb-8">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => router.back()} 
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Assign Teacher to Course</h1>
          <p className="text-slate-600 mt-1">Assign instructor to course</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <form action={submit} className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">Assignment Details</h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Teacher *
                </label>
                <select name="teacher_id" className="input w-full" required>
                  <option value="">Select Teacher</option>
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>{t.name} ({t.employee_id})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Course *
                </label>
                <select name="course_id" className="input w-full" required>
                  <option value="">Select Course</option>
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>{c.course_code} - {c.title}</option>
                  ))}
                </select>
              </div>

            </div>
          </div>

          <div className="flex gap-4 pt-8 border-t border-slate-200">
            <button 
              type="button" 
              onClick={() => router.back()}
              className="px-6 py-3 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition ml-auto"
            >
              Assign Teacher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}