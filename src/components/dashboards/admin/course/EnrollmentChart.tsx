"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", students: 40 },
  { month: "Feb", students: 55 },
  { month: "Mar", students: 70 },
  { month: "Apr", students: 90 },
  { month: "May", students: 110 },
  { month: "Jun", students: 120 },
];

export default function CourseEnrollmentChart() {
  return (
    <div className="bg-white p-6 rounded-xl border">

      <h3 className="text-sm font-semibold mb-4">
        Enrollment Trend
      </h3>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="students"
              stroke="#16a34a"
              fill="#dcfce7"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}