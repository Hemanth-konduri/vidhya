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
  { subject: "DS", value: 88 },
  { subject: "OS", value: 82 },
  { subject: "DBMS", value: 90 },
  { subject: "CN", value: 75 },
];

const COLORS = ["#22c55e", "#38bdf8", "#a78bfa", "#facc15"];

export default function AttendanceChart() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Attendance</h3>
        <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-md">
          +5%
        </span>
      </div>

      <div className="text-3xl font-bold mt-2">86%</div>
      <p className="text-xs text-slate-500 mb-4">
        Average Attendance
      </p>

      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis hide />
            <Tooltip />

            <Bar dataKey="value" radius={[10,10,0,0]}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-4 text-sm">
        {data.map((d, i) => (
          <div key={d.subject} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[i] }}
            />
            {d.subject}
          </div>
        ))}
      </div>

    </div>
  );
}