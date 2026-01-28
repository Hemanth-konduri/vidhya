import {
  Users,
  GraduationCap,
  BookOpen,
  Layers,
} from "lucide-react";

type CardConfig = {
  icon: any;
  iconBg: string;
};

const cardStyles: Record<string, CardConfig> = {
  "Total Students": {
    icon: Users,
    iconBg: "bg-green-100 text-green-700",
  },
  "Total Teachers": {
    icon: GraduationCap,
    iconBg: "bg-orange-100 text-orange-700",
  },
  "Total Courses": {
    icon: BookOpen,
    iconBg: "bg-indigo-100 text-indigo-700",
  },
  "Total Classes": {
    icon: Layers,
    iconBg: "bg-purple-100 text-purple-700",
  },
  "Active Courses": {
    icon: BookOpen,
    iconBg: "bg-emerald-100 text-emerald-700",
  },
};
const UserCards = ({
  title,
  value,
  growth = "+8",
}: {
  title: string;
  value: string;
  growth?: string;
}) => {
  const config = cardStyles[title];

  const Icon = config?.icon || Users;

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all">

      {/* Top Row */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center ${config?.iconBg}`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {/* Value */}
      <h2 className="text-3xl font-semibold text-slate-900 mt-3">
        {value}
      </h2>

      {/* Growth */}
      <div className="flex items-center gap-1 mt-2">
        <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">
          ↑ {growth}%
        </span>
        <span className="text-xs text-slate-500">
          last 30 days
        </span>
      </div>

    </div>
  );
};

export default UserCards;