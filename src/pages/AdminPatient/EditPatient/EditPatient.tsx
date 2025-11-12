

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../../Api/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditPatient = () => {

  const { patient_id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state;

  const [firstName, setFirstname] = useState(patient?.first_name || "");
  const [lastName, setLastname] = useState(patient?.last_name || "");
  const [email, setEmail] = useState(patient?.email_encrypted || "");
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (!patient && patient_id) {
      fetchPatientDetails(patient_id);
    }
  }, [patient_id]);

  const fetchPatientDetails = async (id: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      const res = await api.get(`${API_BASE_URL}/patients/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data;
      setFirstname(data.first_name || "");
      setLastname(data.last_name || "");
      setEmail(data.email_encrypted || "");
    } catch (err: any) {
      console.error("Error fetching patient details:", err);
      toast.error("Failed to load patient details");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!firstName || !lastName || !email) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
        
      setLoading(true);
      const token = localStorage.getItem("access_token");
      const payload = {
        first_name: firstName,
        last_name: lastName,
        email_encrypted: email,
      };
      await api.put(
        `${API_BASE_URL}/patients/${patient?.id || patient_id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Patient updated successfully!");
      setTimeout(() => navigate("/admin/patients"), 1500);
    } catch (err: any) {
      console.error("Update error:", err.response || err.message);
      toast.error("Failed to update patient");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 bg-white shadow-lg rounded px-10 py-10">
      <ToastContainer />
      <h1 className="text-2xl font-semibold">Edit Patient</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="my-1">First Name</label>
          <input
            value={firstName}
            onChange={(e) => setFirstname(e.target.value)}
            className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="my-1">Last Name</label>
          <input
            value={lastName}
            onChange={(e) => setLastname(e.target.value)}
            className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label className="my-1">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 bg-gray-100 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <button
          onClick={handleSave}
          disabled={loading}
          className={`bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default EditPatient;
