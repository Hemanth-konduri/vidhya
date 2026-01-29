"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Completed", value: 70, color: "#16a34a" },
  { name: "Remaining", value: 30, color: "#e5e7eb" },
];

export default function CourseCompletionDonut() {
  return (
    <div className="bg-white p-6 rounded-xl border text-center">

      <h3 className="text-sm font-semibold mb-4">
        Completion Rate
      </h3>

      <div className="h-48 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={50}
              outerRadius={80}
              dataKey="value"
            >
              {data.map((d, i) => (
                <Cell key={i} fill={d.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex items-center justify-center text-2xl font-semibold">
          70%
        </div>
      </div>

    </div>
  );
}