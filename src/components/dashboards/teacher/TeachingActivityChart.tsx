"use client";

import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const data = [
  { day: "Mon", worked: 6, rest: 18 },
  { day: "Tue", worked: 7, rest: 17 },
  { day: "Wed", worked: 5, rest: 19 },
  { day: "Thu", worked: 6, rest: 18 },
];

export default function TeachingActivityChart() {
  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm">
      <h3 className="font-semibold mb-4">
        Teaching Activity (Hours)
      </h3>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="worked" fill="#4f46e5" />
          <Bar dataKey="rest" fill="#94a3b8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
