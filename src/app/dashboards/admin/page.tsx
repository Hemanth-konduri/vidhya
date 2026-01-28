// "use client";

import UserCards from "@/components/dashboards/admin/UserCards";

import StudentEnrollmentChart from "@/components/dashboards/admin/StudentEnrollmentChart";
import AttendanceBarChart from "@/components/dashboards/admin/AttendanceBarChart";
import CourseDistributionPie from "@/components/dashboards/admin/CourseDistributionPie";
import AssignmentStatusDonut from "@/components/dashboards/admin/AssignmentStatusDonut";

import RecentUsersTable from "@/components/dashboards/admin/RecentUsersTable";
import NotificationsPanel from "@/components/dashboards/admin/NotificationsPanel";
import FeedbackPanel from "@/components/dashboards/admin/FeedbackPanel";

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
        <h1 className="text-3xl font-bold text-slate-900">
          Dashboard Overview
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Academic performance & system insights
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <UserCards title="Total Students" value="1,560" growth="80" />
        <UserCards title="Total Teachers" value="120" growth="5" />
        <UserCards title="Total Courses" value="45" growth="8" />
        <UserCards title="Total Classes" value="30" growth="2" />
        <UserCards title="Active Courses" value="38" growth="4" />
      </div>

      {/* MAIN CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StudentEnrollmentChart />
        <AttendanceBarChart />
      </div>

      {/* LOWER CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CourseDistributionPie />
        <AssignmentStatusDonut />
        <NotificationsPanel />
      </div>

      {/* TABLE + FEEDBACK */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentUsersTable />
        </div>

        <FeedbackPanel />
      </div>

    </div>
  );
}