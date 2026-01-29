"use client";

import { useState } from "react";
import { Eye, Ban, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Teacher = {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  designation: string;
  coursesCount: number;
  experience: number;
  status: boolean;
};

const dummyTeachers: Teacher[] = [
  {
    id: "1",
    name: "Dr. Priya Sharma",
    employeeId: "EMP001",
    department: "CSE",
    designation: "Professor",
    coursesCount: 3,
    experience: 12,
    status: true,
  },
  {
    id: "2",
    name: "Mr. Rajesh Kumar",
    employeeId: "EMP002",
    department: "ECE",
    designation: "Associate Professor",
    coursesCount: 2,
    experience: 8,
    status: true,
  },
  {
    id: "3",
    name: "Dr. Anita Reddy",
    employeeId: "EMP003",
    department: "CSE",
    designation: "Assistant Professor",
    coursesCount: 4,
    experience: 5,
    status: false,
  },
];

export default function AdminTeachersPage() {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const router = useRouter();

  const filteredTeachers = dummyTeachers.filter((t) => {
    if (selectedDepartment && t.department !== selectedDepartment) return false;
    if (selectedDesignation && t.designation !== selectedDesignation) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">Teachers</h1>
        <p className="text-sm text-slate-500">
          Manage teachers by department and designation
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex gap-4">
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm"
        >
          <option value="">All Departments</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="ME">ME</option>
        </select>

        <select
          value={selectedDesignation}
          onChange={(e) => setSelectedDesignation(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm"
        >
          <option value="">All Designations</option>
          <option value="Professor">Professor</option>
          <option value="Associate Professor">Associate Professor</option>
          <option value="Assistant Professor">Assistant Professor</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="text-left px-4 py-3">Teacher</th>
              <th className="text-left px-4 py-3">Employee ID</th>
              <th className="text-left px-4 py-3">Department</th>
              <th className="text-left px-4 py-3">Designation</th>
              <th className="text-left px-4 py-3">Courses</th>
              <th className="text-left px-4 py-3">Experience</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTeachers.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-8 text-slate-400"
                >
                  No teachers found
                </td>
              </tr>
            ) : (
              filteredTeachers.map((teacher) => (
                <tr
                  key={teacher.id}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-700">
                        {teacher.name.charAt(0)}
                      </div>
                      <span className="font-medium">{teacher.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{teacher.employeeId}</td>
                  <td className="px-4 py-3">{teacher.department}</td>
                  <td className="px-4 py-3">{teacher.designation}</td>
                  <td className="px-4 py-3">{teacher.coursesCount}</td>
                  <td className="px-4 py-3">{teacher.experience} years</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        teacher.status
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {teacher.status ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        title="View"
                        onClick={() =>
                          router.push(`/dashboards/admin/teachers/${teacher.id}`)
                        }
                        className="p-2 rounded hover:bg-slate-200"
                      >
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