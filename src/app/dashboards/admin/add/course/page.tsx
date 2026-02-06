"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createCourse } from "../../actions/createCourse";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export default function AddCoursePage() {
  const router = useRouter();
  const [departments, setDepartments] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const [deptData, teacherData] = await Promise.all([
        supabase.from("departments").select("id, name").order("name"),
        supabase.from("teachers").select("id, name").order("name")
      ]);
      setDepartments(deptData.data || []);
      setTeachers(teacherData.data || []);
    }
    fetchData();
  }, []);

  async function submit(fd: FormData) {
    try {
      await createCourse(fd);
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
          <h1 className="text-3xl font-bold text-slate-900">Add Course</h1>
          <p className="text-slate-600 mt-1">Create new academic course</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <form action={submit} className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">Course Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Course Code *
                </label>
                <input 
                  type="text" 
                  name="course_code" 
                  className="input w-full" 
                  placeholder="e.g., CS101"
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Course Title *
                </label>
                <input 
                  type="text" 
                  name="title" 
                  className="input w-full" 
                  placeholder="e.g., Introduction to Programming"
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Department
                </label>
                <select name="department_id" className="input w-full">
                  <option value="">Select Department</option>
                  {departments.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Credits
                </label>
                <input 
                  type="number" 
                  name="credits" 
                  className="input w-full" 
                  placeholder="e.g., 4"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Instructor
                </label>
                <select name="instructor_id" className="input w-full">
                  <option value="">Select Instructor</option>
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Status
                </label>
                <select name="status" className="input w-full">
                  <option value="draft">Draft</option>
                  <option value="pending_review">Pending Review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>
                <textarea 
                  name="description" 
                  className="input w-full min-h-25" 
                  placeholder="Enter course description"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Prerequisites
                </label>
                <input 
                  type="text" 
                  name="prerequisites" 
                  className="input w-full" 
                  placeholder="e.g., CS100, CS101"
                />
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
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}