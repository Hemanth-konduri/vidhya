"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Computer Science", value: 40, color: "#16a34a" },
  { name: "Electronics", value: 25, color: "#22c55e" },
  { name: "Mechanical", value: 20, color: "#86efac" },
  { name: "Civil", value: 15, color: "#bbf7d0" },
];

export default function CourseDistributionPie() {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200">

      <h3 className="text-sm font-semibold mb-4">Course Distribution</h3>

      <div className="flex items-center gap-4 h-55">

        <div className="w-1/2 h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={40}
                outerRadius={80}
                dataKey="value"
              >
                {data.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
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