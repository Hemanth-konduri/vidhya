"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { dept: "CSE", value: 85 },
  { dept: "ECE", value: 78 },
  { dept: "ME", value: 82 },
  { dept: "CE", value: 75 },
  { dept: "EEE", value: 80 },
];

const COLORS = ["#84cc16", "#16a34a", "#22c55e", "#facc15", "#a78bfa"];

export default function AttendanceBarChart() {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200">

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">Attendance Overview</h3>
        <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-md">
          +5% last 30 days
        </span>
      </div>

      <div className="text-3xl font-bold mb-2">86.5%</div>
      <p className="text-xs text-slate-500 mb-4">Average Attendance</p>

      <div className="h-55">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="dept" />
            <YAxis hide />
            <Tooltip />

            <Bar dataKey="value" radius={[10, 10, 0, 0]}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}