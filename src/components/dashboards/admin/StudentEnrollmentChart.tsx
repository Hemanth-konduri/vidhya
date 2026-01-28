"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", students: 1200 },
  { month: "Feb", students: 1300 },
  { month: "Mar", students: 1380 },
  { month: "Apr", students: 1450 },
  { month: "May", students: 1520 },
  { month: "Jun", students: 1600 },
];

export default function StudentEnrollmentChart() {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200">

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">Student Enrollment</h3>
        <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-md">
          +12% last 30 days
        </span>
      </div>

      <div className="h-65">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="enroll" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
  dataKey="month"
  tick={{ fontSize: 12, fill: "#94a3b8" }}
  axisLine={false}
  tickLine={false}
/>

<YAxis
  tick={{ fontSize: 12, fill: "#94a3b8" }}
  axisLine={false}
  tickLine={false}
/>
            <Tooltip />

            <Area
              type="monotone"
              dataKey="students"
              stroke="#16a34a"
              fill="url(#enroll)"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}