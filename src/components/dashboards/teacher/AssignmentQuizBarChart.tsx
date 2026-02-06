"use client";

import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const data = [
  { batch: "CSE-A", assignments: 78, quizzes: 85 },
  { batch: "CSE-B", assignments: 65, quizzes: 72 },
  { batch: "ECE-A", assignments: 88, quizzes: 90 },
];

export default function AssignmentQuizBarChart() {
  return (
    <div className="bg-white p-6 rounded-xl border shadow-sm">
      <h3 className="font-semibold mb-4">
        Assignment vs Quiz Submission Rate
      </h3>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="batch" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="assignments" fill="#6366f1" />
          <Bar dataKey="quizzes" fill="#22c55e" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
