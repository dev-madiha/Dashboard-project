

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Details = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    idNumber: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.idNumber) {
      alert("Please fill in all fields");
      return;
    }
    navigate("/consultation-flow/consultation");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center ">
      <div className="w-full max-w-5xl  ">
        <div className="text-center mb-6">
          <h1 className="text-[32px] text-blue-600 font-semibold">
            Your Details
          </h1>
          <p className="text-gray-500 text-sm">
            Please confirm your information to proceed with your consultation.
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg  mb-6">
          <h2 className="text-lg font-medium text-gray-800 mb-1">
            Patient Information
          </h2>
          <p className="text-gray-500 text-sm">
            Your information is encrypted and protected under the POPI Act.
          </p>
        </div>

        <form onSubmit={handleNext} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-blue-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-blue-400"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              {" "}
              ID Number{" "}
            </label>
            <input
              type="text"
              name="idNumber"
              value={form.idNumber}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-semibold mt-4"
          >
            Continue to Consultation
          </button>
        </form>
      </div>
    </div>
  );
};

export default Details;
