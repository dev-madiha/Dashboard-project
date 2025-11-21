import React, { useEffect, useState } from "react";
import { Circle, Clock, X } from "lucide-react";
import api from "../../../Api/axiosInstance";
import { useAuth } from "../../../../context/AuthContext";

interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email_encrypted: string;
}

interface QueueItem {
  queue_id: string;
  position: number;
  status: string;
  registered_at: string;
  waiting_time_minutes: number;
  patient: Patient | null;
}

const PatientQueue = () => {
  const { user } = useAuth();

  const canViewQueue = user?.permissions?.includes("queue:view");
  const canExitPatient = user?.permissions?.includes("queue:accept");

  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState<QueueItem | null>(
    null
  );

  const [error, setError] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchQueue = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("access_token");
        const res = await api.get(`${API_BASE_URL}/doctor-portal/queue`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQueue(res.data.queue || []);
        setError("");
      } catch (err) {
        console.error("Error fetching patient queue:", err);
        setError("Failed to load patient queue. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchQueue();
  }, []);

  const handleExitPatient = async (queueId: string) => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await api.put(
        `${API_BASE_URL}/doctor-portal/queue/${queueId}/exit`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Exit response:", res.data);
      setQueue((prevQueue) =>
        prevQueue.filter((item) => item.queue_id !== queueId)
      );
    } catch (err) {
      console.error("Error exiting patient:", err);
      alert("Failed to exit patient. Please try again.");
    }
  };
  if (!canViewQueue) {
    return (
      <div className="bg-white shadow-md rounded-2xl p-5 text-center text-red-500 font-semibold">
        You do not have permission to view the queue.
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-2xl p-5">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-lg font-semibold text-gray-800">Patient Queue</h1>
        <span className="text-sm text-gray-500">{queue.length} waiting</span>
      </div>
      <p className="text-gray-500 text-sm mb-4">
        {queue.length} patients waiting for consultation
      </p>

      {loading ? (
        <p className="text-gray-500 text-center py-5">Loading queue...</p>
      ) : error ? (
        <p className="text-red-500 text-center py-5">{error}</p>
      ) : queue.length === 0 ? (
        <p className="text-gray-500 text-center py-5">No patients in queue</p>
      ) : (
        <div className="space-y-3">
          {queue.map((item, index) => (
            <div
              key={item.queue_id || index}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center border border-gray-200 rounded-xl p-3 hover:shadow-sm transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-green-100 text-green-600 rounded-full">
                  <Circle size={22} />
                </div>
                <div>
                  <h2 className="font-medium text-gray-800">
                    {item.patient?.first_name || "Unknown"}
                    {item.patient?.last_name || ""}
                  </h2>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock size={14} />
                    <span>
                      Waiting {item.waiting_time_minutes ?? "N/A"} min
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <p>{item.patient?.phone || "No phone"}</p>
                <p className="text-[14px]">
                  {item.patient?.email_encrypted || "No email"}
                </p>
              </div>

              <div className="flex gap-2 flex-col">
                <button
                  onClick={() => setSelectedPatient(item)}
                  className=" py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
                >
                  View Details
                </button>
                {canExitPatient && (
                  <button
                    onClick={() => handleExitPatient(item.queue_id)}
                    className="px-6 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600"
                  >
                    Exit
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedPatient && (
        <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setSelectedPatient(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={22} />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Patient Details
            </h2>

            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Name:</strong>{" "}
                {selectedPatient.patient?.first_name || "N/A"}
                {selectedPatient.patient?.last_name || ""}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {selectedPatient.patient?.phone || "N/A"}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {selectedPatient.patient?.email_encrypted || "N/A"}
              </p>

              <p>
                <strong>Status:</strong> {selectedPatient.status}
              </p>

              <p>
                <strong>Queue Position:</strong> {selectedPatient.position}
              </p>

              <p>
                <strong>Registered At:</strong>
                {selectedPatient.registered_at
                  ? new Date(selectedPatient.registered_at).toLocaleString()
                  : "N/A"}
              </p>
              <p>
                <strong>Waiting Time:</strong>
                {selectedPatient.waiting_time_minutes} minutes
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientQueue;
