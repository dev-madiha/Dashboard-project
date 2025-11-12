import React from "react";
import { VideoIcon, ClockIcon } from "lucide-react";

const patients = [
  { id: 1, name: "John Doe", waiting: "5 min", initials: "JD" },
  { id: 2, name: "Micheal Rob", waiting: "5 min", initials: "MR" },
  { id: 3, name: "Sara John", waiting: "5 min", initials: "SJ" },
];

export default function PatientsQueue() {
  return (
    <div className="bg-white shadow-md rounded-2xl  px-4 py-12">
     
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-800">Patients in Queue</h2>
        <span className="bg-orange-100 text-orange-600 text-sm font-medium px-3 py-1 rounded-xl">
          {patients.length} Waiting
        </span>
      </div>
      <p className="text-gray-500 text-sm mb-4">
        Currently waiting for consultation
      </p>


      <div className="space-y-3">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="flex justify-between items-center border border-gray-200 rounded-xl p-3 hover:shadow-sm transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full font-semibold">
                {patient.initials}
              </div>
              <div>
                <h3 className="font-medium text-gray-800">{patient.name}</h3>
                <div className="flex items-center gap-1 text-sm text-orange-500">
                  <ClockIcon size={14} />
                  <span>Waiting {patient.waiting}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 border border-gray-200 px-2 py-0.5 rounded-lg">
                #{patient.id}
              </span>
              <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition">
                <VideoIcon size={16} />
                Start Call
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
