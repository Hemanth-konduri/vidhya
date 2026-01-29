"use client";

import Image from "next/image";
import { Eye, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Student = {
  id: string;
  name: string;
  email: string;
  rollNo: string;
  class: string;
  section: string;
  status: "active" | "disabled";
};

const students: Student[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    rollNo: "CSE101",
    class: "CSE",
    section: "A",
    status: "active",
  },
  {
    id: "2",
    name: "Ananya Reddy",
    email: "ananya@gmail.com",
    rollNo: "CSE102",
    class: "CSE",
    section: "B",
    status: "disabled",
  },
  {
    id: "3",
    name: "Mohit Verma",
    email: "mohit@gmail.com",
    rollNo: "ECE201",
    class: "ECE",
    section: "A",
    status: "active",
  },
];

export default function StudentsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200">

      {/* TOP BAR */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold">Students</h1>

        <div className="flex items-center gap-3">
          <input
            placeholder="Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded-lg text-sm outline-none"
          />

          <button
            onClick={() =>
              router.push("/dashboards/admin/students/add")
            }
            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            + Add Student
          </button>
        </div>
      </div>

      {/* TABLE */}
      <table className="w-full text-sm">

        {/* HEAD */}
        <thead>
          <tr className="text-left text-slate-500 border-b">
            <th className="py-3">Info</th>
            <th className="hidden md:table-cell">Roll No</th>
            <th className="hidden md:table-cell">Class</th>
            <th className="hidden md:table-cell">Section</th>
            <th>Status</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {filtered.map((s) => (
            <tr
              key={s.id}
              className="border-b hover:bg-slate-50 transition"
            >

              {/* INFO */}
              <td className="py-4">
                <div className="flex items-center gap-3">
                  <Image
                    src="/noAvatar.png"
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">{s.name}</p>
                    <p className="text-xs text-slate-500">
                      {s.email}
                    </p>
                  </div>
                </div>
              </td>

              <td className="hidden md:table-cell">
                {s.rollNo}
              </td>

              <td className="hidden md:table-cell">
                {s.class}
              </td>

              <td className="hidden md:table-cell">
                {s.section}
              </td>

              {/* STATUS */}
              <td>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    s.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {s.status}
                </span>
              </td>

              {/* ACTIONS */}
              <td>
                <div className="flex justify-end gap-2">

                  <button
                    onClick={() =>
                      router.push(
                        `/dashboards/admin/students/${s.id}`
                      )
                    }
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50"
                  >
                    <Eye size={16} />
                  </button>

                  <button className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50">
                    <Trash2 size={16} />
                  </button>

                </div>
              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}