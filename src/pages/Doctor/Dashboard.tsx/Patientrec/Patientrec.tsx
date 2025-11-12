import React, { useState, useEffect } from "react";
import api from "../../../Api/axiosInstance";
import { Search, Loader2, UserRound } from "lucide-react";
import { toast } from "react-toastify";

interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  sa_id_encrypted: string;
  created_at: string;
  age: string;
  gender: string;
  total_visits: string;
  last_visits: string;
}

const Patientrec = () => {

  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const fetchPatients = async (query?: string) => {
    setError("");
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      const response = await api.get(`${API_BASE_URL}/patients/`, {
        headers: { Authorization: `Bearer ${token}` },
        params: query ? { search: query } : {},
      });

      const results = response.data.results || response.data || [];
      setPatients(results);
      setTotal(response.data.total || results.length || 0);
    } catch (err: any) {
      console.error("Fetch error:", err.response || err.message);
      setError("Failed to load patients");
      toast.error("Failed to load patients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPatients(searchQuery);
  };

  return (

    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Patients Record
          </h2>
          <p className="text-gray-500 text-sm">
            {total} Patients with visit history
          </p>
        </div>
        <span className="bg-orange-100 text-orange-600 text-sm font-medium px-3 py-1 rounded-xl self-start sm:self-auto">
          Waiting
        </span>
      </div>

      <form onSubmit={handleSearch} className="relative mb-6">
        <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by patient name or ID"
          className="rounded-xl bg-white shadow-sm p-3 pl-10 w-full outline-none focus:ring-2 focus:ring-blue-500 transition border border-gray-200"
        />
      </form>

      {loading && (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
        </div>
      )}

      {!loading && patients.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          <UserRound className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p>{error || "No patients found."}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {!loading &&
          patients.map((patient) => (
            <div
              key={patient.id}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-50 p-3 rounded-full">
                  <UserRound className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {patient.first_name} {patient.last_name}
                  </h3>
                  <p className="text-sm text-gray-500">{patient.phone}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-gray-700 my-4">
                <p className="truncate">{patient.email}</p>
                <div className="grid grid-cols-2 gap-3 my-4">
                  <div>
                    <p className="text-gray-500 text-xs">Last Visit</p>
                    <p className="font-medium">{patient.last_visits || "—"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Total Visits</p>
                    <p className="font-medium">{patient.total_visits || "—"}</p>
                  </div>
                </div>
              </div>

              <button className="mt-5 w-full bg-blue-600 text-white py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition">
                View Record
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Patientrec;
