"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, Users, Check } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { assignStudentsToBatch } from "../../actions/assignStudentsToBatch";

interface Student {
  id: string;
  name: string;
  roll_no: string | null;
  email: string;
  batch_id?: string | null;
  batches?: { name: string };
}

interface Batch {
  id: string;
  name: string;
}

export default function AssignStudentToBatchPage() {
  const router = useRouter();

  const [students, setStudents] = useState<Student[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth?.user) return;

    // ✅ Get teacher batches
    const { data: classData } = await supabase
      .from("classes")
      .select("batch_id, batches(id, name)")
      .eq("class_teacher_id", auth.user.id);

    const teacherBatches =
      classData?.map((c: any) => c.batches).filter(Boolean) || [];

    setBatches(teacherBatches);

    // ✅ Get students
    const { data: studentData, error } = await supabase
      .from("students")
      .select(`
        id,
        name,
        roll_no,
        email,
        batch_id,
        batches(name)
      `)
      .order("name");

    console.log("Student data:", studentData, "Error:", error);

    setStudents(studentData || []);
  }

  // ✅ Null-safe search
  const filteredStudents = students.filter(
    (s) =>
      s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.roll_no?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function toggleStudent(id: string) {
    setSelectedStudents((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : [...prev, id]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!selectedBatch || selectedStudents.length === 0) {
      alert("Please select a batch and at least one student");
      return;
    }

    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("batch_id", selectedBatch);
      selectedStudents.forEach((id) =>
        fd.append("student_ids", id)
      );

      await assignStudentsToBatch(fd);

      alert("Students assigned successfully!");
      router.push("/dashboards/teacher");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8 pb-8">

      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-slate-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold">Assign Students to Batch</h1>
          <p className="text-slate-600">
            Search and assign students
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl border space-y-8"
      >

        {/* Batch Select */}
        <div>
          <h2 className="font-semibold mb-2">Select Batch</h2>
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="input max-w-md"
            required
          >
            <option value="">Choose batch</option>
            {batches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div>
          <h2 className="font-semibold mb-2">Search Students</h2>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or roll no"
              className="input pl-10"
            />
          </div>
        </div>

        {/* Students List */}
        <div className="border rounded-lg max-h-96 overflow-y-auto">
          {filteredStudents.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <Users className="w-10 h-10 mx-auto mb-2 opacity-50" />
              No students found
            </div>
          ) : (
            filteredStudents.map((s) => (
              <div
                key={s.id}
                onClick={() => toggleStudent(s.id)}
                className={`p-4 flex justify-between items-center border-b cursor-pointer
                  ${
                    selectedStudents.includes(s.id)
                      ? "bg-green-50 border-l-4 border-green-500"
                      : "hover:bg-slate-50"
                  }`}
              >
                <div>
                  <p className="font-medium">{s.name}</p>
                  <p className="text-sm text-slate-600">
                    Roll: {s.roll_no || "-"}
                  </p>
                  <p className="text-sm text-slate-500">
                    {s.email}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {s.batch_id ? (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {s.batches?.name || "Assigned"}
                    </span>
                  ) : (
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      Unassigned
                    </span>
                  )}

                  {selectedStudents.includes(s.id) && (
                    <Check className="w-5 h-5 text-green-600" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50"
          >
            {loading ? "Assigning..." : "Assign Students"}
          </button>
        </div>
      </form>
    </div>
  );
}
