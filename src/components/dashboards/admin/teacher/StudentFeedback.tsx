"use client";

import { Star, ThumbsUp, AlertTriangle, Frown } from "lucide-react";

const feedbackData = [
  {
    id: "1",
    student: "Rahul Sharma",
    course: "Data Structures",
    message: "Excellent teaching methodology. Very clear explanations!",
    date: "2024-01-15",
    rating: 5,
    type: "positive",
  },
  {
    id: "2",
    student: "Ananya Reddy",
    course: "Operating Systems",
    message: "Could use more practical examples in the lectures.",
    date: "2024-01-12",
    rating: 3,
    type: "neutral",
  },
  {
    id: "3",
    student: "Mohit Verma",
    course: "Database Systems",
    message: "Great lab sessions. Very hands-on approach.",
    date: "2024-01-10",
    rating: 5,
    type: "positive",
  },
  {
    id: "4",
    student: "Priya Singh",
    course: "Computer Networks",
    message: "Difficult to follow sometimes. Need more examples.",
    date: "2024-01-08",
    rating: 2,
    type: "negative",
  },
];

export default function StudentFeedback() {
  const getIcon = (type: string) => {
    switch (type) {
      case "positive":
        return <ThumbsUp size={16} className="text-green-600" />;
      case "neutral":
        return <AlertTriangle size={16} className="text-yellow-600" />;
      case "negative":
        return <Frown size={16} className="text-red-600" />;
      default:
        return <ThumbsUp size={16} className="text-green-600" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case "positive":
        return "bg-green-100";
      case "neutral":
        return "bg-yellow-100";
      case "negative":
        return "bg-red-100";
      default:
        return "bg-green-100";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Student Feedback</h3>
        <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-md">
          4.2/5 Average
        </span>
      </div>

      <div className="space-y-4 max-h-80 overflow-y-auto">
        {feedbackData.map((item) => (
          <div
            key={item.id}
            className="border border-slate-100 rounded-lg p-4 hover:bg-slate-50"
          >
            
            <div className="flex items-start gap-3">
              
              <div className={`p-2 rounded-lg ${getIconBg(item.type)}`}>
                {getIcon(item.type)}
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
                        <Star
                          key={i}
                          size={12}
                          className={`${
                            i < item.rating 
                              ? "text-yellow-400 fill-yellow-400" 
                              : "text-slate-300"
                          }`}
                        />
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

      <button className="w-full mt-4 text-sm text-green-600 hover:text-green-700 font-medium">
        View All Feedback →
      </button>

    </div>
  );
}