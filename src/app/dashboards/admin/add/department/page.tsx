"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createDepartment } from "../../actions/createDepartment";
import { supabase } from "@/lib/supabase/client";

export default function AddDepartmentPage() {
  const router = useRouter();
  const [programs, setPrograms] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPrograms() {
      const { data } = await supabase.from("programs").select("id, name").order("name");
      setPrograms(data || []);
    }
    fetchPrograms();
  }, []);

  async function submit(fd: FormData) {
    try {
      await createDepartment(fd);
      router.push("/dashboards/admin");
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
          <h1 className="text-3xl font-bold text-slate-900">Add Department</h1>
          <p className="text-slate-600 mt-1">Create new department</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <form action={submit} className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">Department Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Department Name *
                </label>
                <input 
                  type="text" 
                  name="name" 
                  className="input w-full" 
                  placeholder="e.g., Computer Science Engineering"
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Program *
                </label>
                <select name="program_id" className="input w-full" required>
                  <option value="">Select Program</option>
                  {programs.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
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
              Create Department
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}