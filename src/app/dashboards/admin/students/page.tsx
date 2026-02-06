"use client";

import { useEffect, useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Pagination from "@/components/ui/pagination";
import { supabase } from "@/lib/supabase/client";

type Student = {
  id: string;
  name: string;
  email: string;
  roll_no: string;
  image_url: string | null;
  departments?: { name: string };
  batches?: { name: string };
};


export default function StudentsPage() {
  const router = useRouter();

  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 5;

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    try {
      const { data, error } = await supabase
        .from("students")
        .select(`
           id,
           name,
           email,
           roll_no,
           image_url,
           departments(name),
           batches(name)
            `)

        .order("name");

      if (error) throw error;
      setStudents(data || []);
    } catch (err) {
      console.error("Fetch students error:", err);
    } finally {
      setLoading(false);
    }
  }

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase()) ||
    s.roll_no.toLowerCase().includes(search.toLowerCase()) ||
    (s.departments?.name || "")
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    (s.batches?.name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filtered.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60 text-slate-500">
        Loading students...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Students</h1>
          <p className="text-sm text-slate-500">
            Manage students ({students.length})
          </p>
        </div>

        <input
          placeholder="Search students..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-3 py-2 rounded-lg text-sm outline-none w-72"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden">

        <table className="w-full text-sm border-collapse">

          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Student</th>
              <th className="px-4 py-3 text-left">Roll No</th>
              <th className="px-4 py-3 text-left">Department</th>
              <th className="px-4 py-3 text-left">Batch</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>

            {paginatedStudents.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-10 text-slate-400"
                >
                  No students found
                </td>
              </tr>
            )}

            {paginatedStudents.map((s) => (
              <tr
                key={s.id}
                className="border-t hover:bg-slate-50"
              >

                {/* STUDENT */}
                <td className="px-4 py-3">
  <div className="flex items-center gap-3">

    {/* PHOTO */}
    {s.image_url ? (
      <img
        src={s.image_url}
        alt={s.name}
        className="w-9 h-9 rounded-full object-cover"
      />
    ) : (
      <div
        className="w-9 h-9 rounded-full bg-indigo-100
                   flex items-center justify-center
                   text-indigo-700 font-semibold"
      >
        {s.name.charAt(0)}
      </div>
    )}

    {/* NAME + EMAIL */}
    <div>
      <p className="font-medium leading-tight">{s.name}</p>
      <p className="text-xs text-slate-500">{s.email}</p>
    </div>

  </div>
</td>


                {/* ROLL */}
                <td className="px-4 py-3">
                  {s.roll_no}
                </td>

                {/* DEPARTMENT */}
                <td className="px-4 py-3">
                  {s.departments?.name || "—"}
                </td>

                {/* BATCH */}
                <td className="px-4 py-3">
                  {s.batches?.name || "Unassigned"}
                </td>

                {/* ACTIONS */}
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">

                    <button
                      onClick={() =>
                        router.push(
                          `/dashboards/admin/students/${s.id}`
                        )
                      }
                      className="p-2 rounded hover:bg-slate-200"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      className="p-2 rounded hover:bg-red-100"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>

                  </div>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

        {/* PAGINATION */}
        {filtered.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filtered.length}
          />
        )}

      </div>

    </div>
  );
}
