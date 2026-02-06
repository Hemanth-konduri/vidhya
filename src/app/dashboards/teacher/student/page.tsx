import TeacherStudentsTable from "@/components/dashboards/teacher/student/TeacherStudentsTable";
// import Pagination from "@/components/ui/pagination";
import Link from "next/link";

export default function TeacherStudentsPage() {
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Students</h1>
          <p className="text-slate-500">
            Students from your batches
          </p>
        </div>

        <Link
          href="/dashboards/teacher/add/student"
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg"
        >
          + Add Student
        </Link>
      </div>

      {/* TABLE */}
      <TeacherStudentsTable />

      {/* PAGINATION */}
      {/* <Pagination /> */}

    </div>
  );
}
