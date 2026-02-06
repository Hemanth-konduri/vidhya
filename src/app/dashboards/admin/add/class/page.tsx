"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClass } from "../../actions/createClass";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export default function AddClassPage() {
  const router = useRouter();
  const [batches, setBatches] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const [batchData, teacherData] = await Promise.all([
        supabase.from("batches").select("id, name").order("name"),
        supabase.from("teachers").select("id, name").order("name")
      ]);
      setBatches(batchData.data || []);
      setTeachers(teacherData.data || []);
    }
    fetchData();
  }, []);

  async function submit(fd: FormData) {
    try {
      await createClass(fd);
      router.push("/dashboards/admin/classes");
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
          <h1 className="text-3xl font-bold text-slate-900">Add Class</h1>
          <p className="text-slate-600 mt-1">Create teaching group for a batch</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <form action={submit} className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">Class Details</h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Batch *
                </label>
                <select name="batch_id" className="input w-full" required>
                  <option value="">Select Batch</option>
                  {batches.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Class Teacher
                </label>
                <select name="class_teacher_id" className="input w-full">
                  <option value="">Select Teacher</option>
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Semester *
                </label>
                <select name="semester" className="input w-full" required>
                  <option value="1">Semester 1</option>
                  <option value="2">Semester 2</option>
                  <option value="3">Semester 3</option>
                  <option value="4">Semester 4</option>
                  <option value="5">Semester 5</option>
                  <option value="6">Semester 6</option>
                  <option value="7">Semester 7</option>
                  <option value="8">Semester 8</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Status
                </label>
                <select name="status" className="input w-full">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
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
              Create Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}