import React from "react";
import { Circle,  Clock } from "lucide-react";

const RecentCons = () => {
  const recent = [
    { id: 1, icon: Circle, title: "John Doe", time: "5 min ago" },
    { id: 2, icon: Circle, title: "Micheal Rob", time: "10 min ago" },
    { id: 3, icon: Circle, title: "Sara John", time: "15 min ago" },
  ];

  return (
    <div className="bg-white shadow-md rounded-2xl p-5">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-lg font-semibold text-gray-800">
          Recent Consultations
        </h1>
        <span className="text-sm text-gray-500">
          {recent.length} Common Cold
        </span>
      </div>

      <p className="text-gray-500 text-sm mb-4">
        Your latest completed consultations today
      </p>

      <div className="space-y-3">
        {recent.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border border-gray-200 rounded-xl p-3 hover:shadow-sm transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-green-100 text-green-600 rounded-full">
                <item.icon size={22} />
              </div>
              <div>
                <h2 className="font-medium text-gray-800">{item.title}</h2>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock size={14} />
                  <span>{item.time}</span>
                </div>
              </div>
            </div>

            <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-lg">
              Common Cold
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentCons;
