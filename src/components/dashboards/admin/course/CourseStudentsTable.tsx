"use client";

const students = [
  { id: "1", name: "Rahul Sharma", progress: 70 },
  { id: "2", name: "Ananya Reddy", progress: 55 },
  { id: "3", name: "Mohit Verma", progress: 90 },
];

export default function CourseStudentsTable() {
  return (
    <div className="bg-white p-6 rounded-xl border">

      <h3 className="text-sm font-semibold mb-4">
        Enrolled Students
      </h3>

      <table className="w-full text-sm">

        <thead className="text-slate-500 border-b">
          <tr>
            <th className="text-left py-2">Student</th>
            <th className="text-right py-2">Progress</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s.id} className="border-b last:border-0">
              <td className="py-3">{s.name}</td>
              <td className="py-3 text-right">{s.progress}%</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}