"use client";

import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";

const subjectPerformanceData = [
  { subject: "Data Structures", performance: 82 },
  { subject: "Web Dev", performance: 75 },
  { subject: "Database", performance: 88 },
  { subject: "OS", performance: 70 },
  { subject: "Algorithms", performance: 85 },
  { subject: "Networking", performance: 78 },
];

const attendanceData = [
  { week: "Week 1", attendance: 92 },
  { week: "Week 2", attendance: 88 },
  { week: "Week 3", attendance: 85 },
  { week: "Week 4", attendance: 90 },
  { week: "Week 5", attendance: 87 },
  { week: "Week 6", attendance: 91 },
];

const engagementData = [
  { name: "Assignments", value: 85 },
  { name: "Participation", value: 70 },
  { name: "Projects", value: 92 },
];

const COLORS = ["#3b82f6", "#f59e0b", "#10b981"];

export default function ClassPerformanceCharts() {
  return (
    <div className="space-y-6">

      {/* TOP ROW - 2 CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* SUBJECT-WISE PERFORMANCE */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Subject-wise Performance
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={subjectPerformanceData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
              <Bar dataKey="performance" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Avg Score %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ENGAGEMENT METRICS */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Engagement Metrics
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={engagementData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {engagementData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* BOTTOM ROW - ATTENDANCE & PERFORMANCE TREND */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ATTENDANCE PERFORMANCE */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Weekly Attendance Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="attendance" 
                stroke="#10b981" 
                fill="#d1fae5"
                strokeWidth={2}
                name="Attendance %"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* PERFORMANCE TREND */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Overall Class Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="attendance" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                dot={{ fill: "#8b5cf6" }}
                name="Performance %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
}
