"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createProgram } from "../../actions/createProgram";

export default function AddProgramPage() {
  const router = useRouter();

  async function submit(fd: FormData) {
    try {
      await createProgram(fd);
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
          <h1 className="text-3xl font-bold text-slate-900">Add Program</h1>
          <p className="text-slate-600 mt-1">Create new academic program</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <form action={submit} className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">Program Information</h2>
            <div className="grid gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Program Name *
                </label>
                <input 
                  type="text" 
                  name="name" 
                  className="input w-full" 
                  placeholder="e.g., Bachelor of Technology, Master of Science"
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
              Create Program
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}