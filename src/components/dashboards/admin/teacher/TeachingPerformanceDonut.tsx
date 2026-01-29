"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Excellent", value: 92, color: "#22c55e" },
  { name: "Improvement", value: 8, color: "#facc15" },
];

const Performance = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full flex flex-col min-h-[350px]">
      <h3 className="text-sm font-semibold mb-4">Performance</h3>

      {/* Donut Chart - Centered and Filling */}
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="w-48 h-48 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={95}
                dataKey="value"
              >
                {data.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-xs text-slate-500">Total</p>
            <p className="text-3xl font-bold">9.2</p>
          </div>
        </div>

        {/* Legend - Below Chart */}
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs">
          {data.map((d) => (
            <div key={d.name} className="flex items-center gap-1">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: d.color }}
              />
              <span>{d.name}</span>
              <span className="text-slate-500">({d.value}%)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Performance;
