"use client";

import { MessageSquare, AlertTriangle, ThumbsUp } from "lucide-react";

const feedbackData = [
  {
    id: "1",
    type: "feedback",
    student: "Rahul Sharma",
    course: "Data Structures",
    message: "Excellent teaching methodology. Very clear explanations!",
    date: "2024-01-15",
    rating: 5,
  },
  {
    id: "2",
    type: "complaint",
    student: "Ananya Reddy",
    course: "Operating Systems",
    message: "Could use more practical examples in the lectures.",
    date: "2024-01-12",
    rating: 3,
  },
  {
    id: "3",
    type: "feedback",
    student: "Mohit Verma",
    course: "Database Systems",
    message: "Great lab sessions. Very hands-on approach.",
    date: "2024-01-10",
    rating: 5,
  },
];

export default function FeedbackComplaints() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Student Feedback</h3>
        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-md">
          4.2/5 Average
        </span>
      </div>

      <div className="space-y-4">
        {feedbackData.map((item) => (
          <div
            key={item.id}
            className="border border-slate-100 rounded-lg p-4 hover:bg-slate-50"
          >
            
            <div className="flex items-start gap-3">
              
              <div className={`p-2 rounded-lg ${
                item.type === "feedback" 
                  ? "bg-green-100 text-green-600" 
                  : "bg-yellow-100 text-yellow-600"
              }`}>
                {item.type === "feedback" ? (
                  <ThumbsUp size={16} />
                ) : (
                  <AlertTriangle size={16} />
                )}
              </div>

              <div className="flex-1">
                
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-sm">{item.student}</p>
                    <p className="text-xs text-slate-500">{item.course}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-xs ${
                            i < item.rating ? "text-yellow-400" : "text-slate-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-slate-400">{item.date}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-600">{item.message}</p>

              </div>

            </div>

          </div>
        ))}
      </div>

      <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
        View All Feedback →
      </button>

    </div>
  );
}