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
  { month: "Jan", score: 55 },
  { month: "Feb", score: 70 },
  { month: "Mar", score: 85 },
  { month: "Apr", score: 65 },
  { month: "May", score: 75 },
  { month: "Jun", score: 72 },
  { month: "Jul", score: 82 },
];

export default function PerformanceArea() {
  return (
    <div className="bg-white border rounded-xl p-6">

      <h3 className="font-semibold mb-4">Performance Trend</h3>

      <div className="h-50">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="month"/>
            <YAxis domain={[0,100]} />
            <Tooltip/>
            <Area
              dataKey="score"
              stroke="#f472b6"
              fill="#fce7f3"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}