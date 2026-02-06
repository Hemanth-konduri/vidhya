"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { assignStudentToBatch } from "../../actions/assignStudentToBatch";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export default function AssignStudentToBatchPage() {
  const router = useRouter();
  const [students, setStudents] = useState<any[]>([]);
  const [batches, setBatches] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const [studentData, batchData] = await Promise.all([
        supabase.from("students").select("id, name, roll_no").order("name"),
        supabase.from("batches").select("id, name").order("name")
      ]);
      setStudents(studentData.data || []);
      setBatches(batchData.data || []);
    }
    fetchData();
  }, []);

  async function submit(fd: FormData) {
    try {
      await assignStudentToBatch(fd);
      router.push("/dashboards/admin/students");
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
          <h1 className="text-3xl font-bold text-slate-900">Assign Student to Batch</h1>
          <p className="text-slate-600 mt-1">Assign student to academic batch</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <form action={submit} className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">Assignment Details</h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Student *
                </label>
                <select name="student_id" className="input w-full" required>
                  <option value="">Select Student</option>
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.roll_no})</option>
                  ))}
                </select>
              </div>

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
              Assign Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}