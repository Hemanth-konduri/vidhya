"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Submitted", value: 60, color: "#16a34a" },
  { name: "Pending", value: 25, color: "#f59e0b" },
  { name: "Overdue", value: 15, color: "#ef4444" },
];

export default function AssignmentStatusDonut() {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200">

      <h3 className="text-sm font-semibold mb-4">Assignment Status</h3>

      <div className="flex items-center gap-4 h-55">

        <div className="relative w-1/2 h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={55}
                outerRadius={80}
                dataKey="value"
              >
                {data.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-2xl font-bold">60%</p>
            <p className="text-xs text-slate-500">Submitted</p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          {data.map((d, i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: d.color }}
              />
              <span className="flex-1">{d.name}</span>
              <span className="text-slate-500">{d.value}%</span>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}