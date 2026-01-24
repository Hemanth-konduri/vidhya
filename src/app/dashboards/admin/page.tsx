// "use client";

// import { useState } from "react";
// import { createTeacher } from "./actions/createTeacher";
// import LogoutButton from "@/components/logout-button";

// export default function AdminPage() {
//   const [message, setMessage] = useState<string | null>(null);

//   async function handleCreateTeacher(formData: FormData) {
//     setMessage(null);
//     try {
//       await createTeacher(formData);
//       setMessage("✅ Teacher created successfully");
//     } catch (err: any) {
//       setMessage(`❌ ${err.message}`);
//     }
//   }

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h1>Admin Dashboard</h1>

//       <LogoutButton />

//       <hr />

//       <h2>Create Teacher</h2>

//       <form action={handleCreateTeacher}>
//         <input
//           name="email"
//           type="email"
//           placeholder="Teacher Email"
//           required
//         />
//         <br /><br />

//         <input
//           name="password"
//           type="password"
//           placeholder="Temporary Password"
//           required
//         />
//         <br /><br />

//         <input
//           name="teacher_id"
//           placeholder="Teacher ID (unique)"
//           required
//         />
//         <br /><br />

//         <button type="submit">Create Teacher</button>
//       </form>

//       {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
//     </div>
//   );
// }


export default function AdminOverviewPage() {
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">
          Dashboard Overview
        </h1>
        <p className="text-slate-500 text-sm">
          Academic performance & system insights
        </p>
      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Students" value="1,240" />
        <StatCard title="Total Teachers" value="84" />
        <StatCard title="Active Courses" value="36" />
        <StatCard title="Classes" value="18" />
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border rounded-lg p-6">
          <h3 className="font-medium mb-2">
            Gender Distribution
          </h3>
          <div className="h-64 flex items-center justify-center text-slate-400">
            Pie / Donut Chart (Boys vs Girls)
          </div>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h3 className="font-medium mb-2">
            Daily Student Performance
          </h3>
          <div className="h-64 flex items-center justify-center text-slate-400">
            Line Chart (Marks / Activity)
          </div>
        </div>
      </div>

      {/* MORE ANALYTICS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white border rounded-lg p-6">
          <h3 className="font-medium mb-2">
            Course Completion Rate
          </h3>
          <div className="h-40 flex items-center justify-center text-slate-400">
            Bar Chart
          </div>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h3 className="font-medium mb-2">
            Teacher Workload
          </h3>
          <div className="h-40 flex items-center justify-center text-slate-400">
            Classes & Assignments
          </div>
        </div>

        <div className="bg-white border rounded-lg p-6">
          <h3 className="font-medium mb-2">
            Alerts & Insights
          </h3>
          <ul className="text-sm text-slate-600 space-y-2">
            <li>⚠️ 12 students inactive</li>
            <li>📉 Low performance in Math</li>
            <li>⏳ 5 assignments pending review</li>
          </ul>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="font-medium mb-4">
          Recent Activities
        </h3>

        <ul className="text-sm text-slate-600 space-y-2">
          <li>👨‍🎓 John enrolled in Physics</li>
          <li>📝 Assignment graded by Mr. Rao</li>
          <li>📚 New course added: AI Basics</li>
        </ul>
      </div>
    </div>
  );
}


function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="bg-white border rounded-lg p-5">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-3xl font-semibold mt-1">{value}</p>
    </div>
  );
}