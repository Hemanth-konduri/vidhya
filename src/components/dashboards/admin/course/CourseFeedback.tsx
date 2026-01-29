"use client";

import { MessageCircle } from "lucide-react";

const feedbacks = [
  { id: 1, student: "Rahul Sharma", comment: "Very well structured course", rating: 5 },
  { id: 2, student: "Ananya Reddy", comment: "More real-world examples needed", rating: 3 },
  { id: 3, student: "Mohit Verma", comment: "Assignments are helpful and challenging", rating: 4 },
];

export default function CourseFeedback() {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full">

      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="w-5 h-5 text-blue-600" />
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Course Feedback</h3>
          <p className="text-xs text-slate-500">{feedbacks.length} feedback received</p>
        </div>
      </div>

      <div className="space-y-4">
        {feedbacks.map((f) => (
          <div
            key={f.id}
            className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-slate-900">{f.student}</h4>
              <div className="flex gap-1">
                {[...Array(f.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
            </div>
            <p className="text-sm text-slate-600">{f.comment}</p>
          </div>
        ))}
      </div>

    </div>
  );
}