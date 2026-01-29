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
  Legend,
} from "recharts";

const data = [
  { dept: "CSE", value: 95 },
  { dept: "ECE", value: 88 },
  { dept: "ME", value: 92 },
  { dept: "CE", value: 85 },
  { dept: "EEE", value: 90 },
];

const COLORS = ["#16a34a", "#38bdf8", "#a78bfa", "#facc15", "#22c55e"];

export default function ClassesAttendanceChart() {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full flex flex-col min-h-[350px]">

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">Classes Attendance %</h3>
        <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-md">
          +3% last 30 days
        </span>
      </div>

      <div className="text-3xl font-bold mb-2">92.5%</div>
      <p className="text-xs text-slate-500 mb-4">Classes Conducted</p>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="dept" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
            />
            <YAxis hide />
            <Tooltip 
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
              }}
            />

            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 mt-4 text-xs">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-1">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: COLORS[i] }}
            />
            <span className="text-slate-600">{item.dept}</span>
          </div>
        ))}
      </div>

    </div>
  );
}