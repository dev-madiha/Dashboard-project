import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../Api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email_encrypted: string;
  sa_id_encrypted: string;
  created_at: string;
}

const AdminPatient = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [total, setTotal] = useState(0);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const fetchPatients = async () => {
    setError("");

    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      const response = await api.get(`${API_BASE_URL}/patients/`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          name: name || null,
          phone: phone || null,
          start_date: startDate ? startDate.toISOString() : null,
          end_date: endDate ? endDate.toISOString() : null,
          limit: 10,
          offset: 0,
        },
      });

      console.log("Patients API response:", response.data);
      setPatients(response.data.results || response.data || []);
      setTotal(response.data.total || response.data.length || 0);
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
    fetchPatients();
  };

  const navigate = useNavigate();
  const handleEdit = (patient: Patient) => {
    navigate(`/admin/patient/edit-patient/${patient.id}`, { state: patient });
  };
  
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this patient?"
    );
    if (!confirmDelete) return;
    try {
      const token = localStorage.getItem("access_token");
      await api.delete(`${API_BASE_URL}/patients/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Patient deleted successfully!");
      setPatients((prev) => prev.filter((patient) => patient.id !== id));
      setTotal((prev) => prev - 1);
    } catch (error: any) {
      console.error("Error deleting patient:", error.response || error.message);
      toast.error("Failed to delete patient");
    }
  };

  return (
    <>
      <div className="my-4">
        <h1 className="text-[24px] font-semibold text-[#1d2939]">
          Patient Managment
        </h1>
        <p className="text-[#667085]">Create, view, and manage patients</p>
      </div>

      <div className="py-6">
        <div className="p-6 bg-white shadow-sm border border-gray-200 rounded-2xl">
          <ToastContainer />
          <h2 className="text-2xl font-semibold mb-4">
            Patients List ({total})
          </h2>

          <form
            onSubmit={handleSearch}
            className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3"
          >
            <input
              type="text"
              placeholder="Search by name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-lg px-2 py-2 bg-gray-100 w-full"
            />

            <input
              type="text"
              placeholder="Search by phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border rounded-lg px-2 py-2 bg-gray-100 w-full"
            />

            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Start Date"
              className="border rounded-lg px-2 py-2 bg-gray-100 w-full"
              dateFormat="yyyy-MM-dd"
              isClearable
            />

            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              placeholderText="End Date"
              className="border rounded-lg px-2 py-2 bg-gray-100 w-full"
              dateFormat="yyyy-MM-dd"
              isClearable
            />

            <button
              type="submit"
              className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition w-full"
            >
              Search
            </button>
          </form>

          {loading && <p className="text-gray-600">Loading patients...</p>}
          {error && <p className="text-red-600">{error}</p>}
          {!loading && patients.length === 0 && (
            <p className="text-gray-500">No patients found.</p>
          )}

          {!loading && patients.length > 0 && (
            <div className="overflow-x-auto border rounded-lg ">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
                    <th className="px-2 py-4">Full Name</th>
                    <th className="px-2 py-4">Phone</th>
                    <th className="px-2 py-4">Email</th>
                    <th className="px-2 py-4">SA ID</th>
                    <th className="px-2 py-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {patients.map((patient) => (
                    <tr
                      key={patient.id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="px-2 py-4 text-[14px]">
                        {`${patient.first_name || ""} ${
                          patient.last_name || ""
                        }`}
                      </td>

                      <td className="px-2 py-4">{patient.phone}</td>
                      <td className="px-2 py-4 text-[14px]">
                        {patient.email_encrypted}
                      </td>

                      <td className="px-2 py-4 text-[14px]">
                        {patient.sa_id_encrypted}
                      </td>

                      {/* <td className="px-2 py-4 text-[12px]">
                        {new Date(patient.created_at).toLocaleString()}
                     </td> */}

                      <td className="px-2 py-4 text-center flex gap-2">
                        <button
                          onClick={() => handleDelete(patient.id)}
                          className="px-3 py-1 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleEdit(patient)}
                          className="px-5 py-1 text-xs font-medium text-white bg-blue-400 hover:bg-blue-500 rounded-lg transition"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPatient;
