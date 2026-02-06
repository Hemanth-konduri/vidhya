"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { batch: "CSE-A", attendance: 82 },
  { batch: "CSE-B", attendance: 75 },
  { batch: "ECE-A", attendance: 90 },
  { batch: "ME-A", attendance: 70 },
];

export default function BatchAttendanceLineChart() {
  return (
    <div className="bg-white p-6 rounded-2xl border shadow-sm">

      {/* HEADER */}
      <div className="mb-4">
        <h3 className="font-semibold text-lg">Batch-wise Attendance</h3>
        <p className="text-sm text-slate-500">
          Attendance percentage per batch
        </p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="batch" />
          <YAxis unit="%" />
          <Tooltip />
          <Legend />

          <Area
            type="monotone"
            dataKey="attendance"
            name="Attendance %"
            stroke="#6366f1"
            strokeWidth={3}
            fill="url(#attendanceGradient)"
            dot={{ r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>

    </div>
  );
}
