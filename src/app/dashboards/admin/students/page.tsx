"use client";

import { useState } from "react";
import { Eye, Ban, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Student = {
  id: string;
  name: string;
  rollNo: string;
  class: string;
  section: string;
  active: boolean;
};



const dummyStudents: Student[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    rollNo: "CSE101",
    class: "CSE",
    section: "A",
    active: true,
  },
  {
    id: "2",
    name: "Ananya Reddy",
    rollNo: "CSE102",
    class: "CSE",
    section: "B",
    active: false,
  },
  {
    id: "3",
    name: "Mohit Verma",
    rollNo: "ECE201",
    class: "ECE",
    section: "A",
    active: true,
  },
];

export default function AdminStudentsPage() {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const router = useRouter();

  const filteredStudents = dummyStudents.filter((s) => {
    if (selectedClass && s.class !== selectedClass) return false;
    if (selectedSection && s.section !== selectedSection) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">Students</h1>
        <p className="text-sm text-slate-500">
          Manage students by class and section
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex gap-4">
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm"
        >
          <option value="">All Classes</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
        </select>

        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm"
        >
          <option value="">All Sections</option>
          <option value="A">Section A</option>
          <option value="B">Section B</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Roll No</th>
              <th className="text-left px-4 py-3">Class</th>
              <th className="text-left px-4 py-3">Section</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-8 text-slate-400"
                >
                  No students found
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="px-4 py-3 font-medium">
                    {student.name}
                  </td>
                  <td className="px-4 py-3">{student.rollNo}</td>
                  <td className="px-4 py-3">{student.class}</td>
                  <td className="px-4 py-3">{student.section}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        student.active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {student.active ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                            title="View"
                            onClick={() =>
                            router.push(`/dashboards/admin/students/${student.id}` )
                            }
                             className="p-2 rounded hover:bg-slate-200">
                     <Eye className="h-4 w-4" />
                      </button>

                      <button
                        title="Disable"
                        className="p-2 rounded hover:bg-yellow-100"
                      >
                        <Ban className="h-4 w-4 text-yellow-600" />
                      </button>

                      <button
                        title="Delete"
                        className="p-2 rounded hover:bg-red-100"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}