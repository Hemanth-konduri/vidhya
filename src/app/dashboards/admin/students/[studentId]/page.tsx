"use client";

import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  BookOpen,
  BarChart3,
  MessageSquare,
  Ban,
  Trash2,
} from "lucide-react";

/* ---------- DUMMY DATA ---------- */

const student = {
  id: "1",
  name: "Rahul Sharma",
  rollNo: "CSE101",
  class: "CSE",
  section: "A",
  email: "rahul@college.edu",
  active: true,
  joinedOn: "2023-07-15",
  courses: [
    { name: "Data Structures", progress: 78 },
    { name: "Operating Systems", progress: 65 },
    { name: "DBMS", progress: 82 },
  ],
  assignments: [
    { title: "Stacks Assignment", marks: 18, outOf: 20 },
    { title: "Process Scheduling", marks: 15, outOf: 20 },
  ],
  feedbacks: [
    "Good course structure for DBMS",
    "Needs more practical examples in OS",
  ],
};

export default function StudentProfilePage() {
  const router = useRouter();
  const { studentId } = useParams();

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Students
          </button>

          <h1 className="text-2xl font-semibold mt-2">
            Student Profile
          </h1>
          <p className="text-sm text-slate-500">
            ID: {studentId}
          </p>
        </div>

        {/* ADMIN ACTIONS */}
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-yellow-100 text-yellow-700 hover:bg-yellow-200">
            <Ban className="h-4 w-4" />
            Disable
          </button>

          <button className="flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-red-100 text-red-700 hover:bg-red-200">
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>

      {/* BASIC INFO */}
      <Section title="Student Information" icon={User}>
        <InfoGrid
          items={[
            { label: "Name", value: student.name },
            { label: "Roll No", value: student.rollNo },
            { label: "Class", value: student.class },
            { label: "Section", value: student.section },
            { label: "Email", value: student.email },
            { label: "Status", value: student.active ? "Active" : "Disabled" },
            { label: "Joined On", value: student.joinedOn },
          ]}
        />
      </Section>

      {/* COURSE PROGRESS */}
      <Section title="Course Progress" icon={BookOpen}>
        <div className="space-y-4">
          {student.courses.map((course) => (
            <div key={course.name}>
              <div className="flex justify-between text-sm mb-1">
                <span>{course.name}</span>
                <span>{course.progress}%</span>
              </div>
              <div className="h-2 bg-slate-200 rounded">
                <div
                  className="h-2 bg-indigo-600 rounded"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ASSIGNMENTS & MARKS */}
      <Section title="Assignments & Marks" icon={BarChart3}>
        <table className="w-full text-sm border rounded-lg overflow-hidden">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="text-left px-4 py-2">Assignment</th>
              <th className="text-left px-4 py-2">Marks</th>
            </tr>
          </thead>
          <tbody>
            {student.assignments.map((a) => (
              <tr key={a.title} className="border-t">
                <td className="px-4 py-2">{a.title}</td>
                <td className="px-4 py-2">
                  {a.marks} / {a.outOf}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* FEEDBACK */}
      <Section title="Student Feedback" icon={MessageSquare}>
        <ul className="list-disc list-inside text-sm text-slate-600 space-y-2">
          {student.feedbacks.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

/* ---------- REUSABLE COMPONENTS ---------- */

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: any;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border rounded-lg p-6">
      <h2 className="flex items-center gap-2 font-medium mb-4">
        <Icon className="h-5 w-5 text-indigo-600" />
        {title}
      </h2>
      {children}
    </div>
  );
}

function InfoGrid({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
      {items.map((item) => (
        <div key={item.label}>
          <p className="text-slate-500">{item.label}</p>
          <p className="font-medium">{item.value}</p>
        </div>
      ))}
    </div>
  );
}