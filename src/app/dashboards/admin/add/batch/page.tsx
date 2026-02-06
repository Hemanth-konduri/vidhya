"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createBatch } from "../../actions/createBatch";
import { supabase } from "@/lib/supabase/client";

export default function AddBatchPage() {
  const router = useRouter();
  const [departments, setDepartments] = useState<any[]>([]);

  useEffect(() => {
    async function fetchDepartments() {
      const { data } = await supabase.from("departments").select("id, name").order("name");
      setDepartments(data || []);
    }
    fetchDepartments();
  }, []);

  async function submit(fd: FormData) {
    try {
      await createBatch(fd);
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
          <h1 className="text-3xl font-bold text-slate-900">Add Batch</h1>
          <p className="text-slate-600 mt-1">Create new academic batch</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <form action={submit} className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">Batch Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Department *
                </label>
                <select name="department_id" className="input w-full" required>
                  <option value="">Select Department</option>
                  {departments.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Batch Name *
                </label>
                <input 
                  type="text" 
                  name="name" 
                  className="input w-full" 
                  placeholder="e.g., CSE-A, CSE-B"
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Max Students *
                </label>
                <input 
                  type="number" 
                  name="max_students" 
                  className="input w-full" 
                  placeholder="e.g., 60"
                  required 
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
              Create Batch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}