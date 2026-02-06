"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

type Student = {
  id: string;
  name: string;
  email: string;
  roll_no: string;
  batches?: { name: string };
};


export default function TeacherStudentsTable() {

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function load() {

      const { data: auth } = await supabase.auth.getUser();
      if (!auth?.user) return;

      // Get teacher batches
      const { data: classes } = await supabase
        .from("classes")
        .select("batch_id")
        .eq("class_teacher_id", auth.user.id);

      const batchIds = classes?.map(c => c.batch_id) || [];

      if (batchIds.length === 0) {
        setLoading(false);
        return;
      }

      // Get students from profiles table
      const { data, error } = await supabase
  .from("students")
  .select(`
    id,
    name,
    email,
    roll_no,
    batch_id,
    batches(name)
  `)
  .in("batch_id", batchIds)
  .order("name");


      if (error) {
        console.error("Error fetching students:", error);
      }

      setStudents(data || []);
      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl border shadow-sm p-8">
        <div className="text-center text-slate-500">Loading students...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">

      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold">Your Students ({students.length})</h3>
      </div>

      <table className="w-full">

        <thead className="bg-slate-50 text-sm">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Roll No</th>
            <th className="px-4 py-3 text-left">Batch</th>
          </tr>
        </thead>

        <tbody>

          {students.map(s => (
            <tr
              key={s.id}
              onClick={() =>
                router.push(`/dashboards/teacher/students/${s.id}`)
              }
              className="border-t hover:bg-slate-50 cursor-pointer"
            >
              <td>
  <div>
    <p className="font-medium">{s.name}</p>
    <p className="text-xs text-slate-500">{s.email}</p>
  </div>
</td>

              <td className="px-4 py-3">{s.roll_no || 'N/A'}</td>
              <td className="px-4 py-3">{s.batches?.name || 'No Batch'}</td>
            </tr>
          ))}

          {students.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center py-6 text-slate-500">
                No students found in your batches
              </td>
            </tr>
          )}

        </tbody>

      </table>

    </div>
  );
}
