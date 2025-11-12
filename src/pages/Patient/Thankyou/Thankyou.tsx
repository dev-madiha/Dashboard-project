import React, { useState } from "react";
import { CheckCircle, Download, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ConsultationComplete = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center py-12 px-4">
      <div className="flex flex-col items-center mb-8">
        <CheckCircle className="w-16 h-16 text-green-500 mb-3" />
        <h1 className="text-3xl font-semibold text-gray-800 mb-1">Thank you</h1>
        <p className="text-gray-500">Your consultation is complete</p>
      </div>

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm p-6 sm:p-8 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          Visit Summary
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          A detailed summary has been sent to your email
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 text-sm border-t border-b border-gray-200 py-4 mb-4">
          <div>
            <p className="text-gray-600">Patient Name</p>
            <p className="font-medium text-gray-900">12</p>
          </div>
          <div>
            <p className="text-gray-600">Visit Date</p>
            <p className="font-medium text-gray-900">
              Wednesday, 29 October 2025
            </p>
          </div>
          <div className="mt-3 sm:mt-0">
            <p className="text-gray-600">Visit Time</p>
            <p className="font-medium text-gray-900">08:18</p>
          </div>
          <div className="mt-3 sm:mt-0">
            <p className="text-gray-600">Doctor</p>
            <p className="font-medium text-gray-900">Dr. Sarah Mhlize</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-50 to-purple-50 border border-gray-100 rounded-xl p-4 flex gap-3 mb-5">
          <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-sm">
            <CheckCircle className="text-blue-500 w-6 h-6" />
          </div>
          <div>
            <p className="font-medium text-gray-800 text-sm">
              Email Confirmation Sent
            </p>
            <p className="text-xs text-gray-500">
              A detailed summary has been sent to <b>example@gmail.com</b>{" "}
              <br />
              Please check your inbox and spam folder.
            </p>
          </div>
        </div>

        <div className="text-sm text-gray-700 mb-5">
          <p className="font-semibold mb-2">Your email includes:</p>
          <ul className="space-y-1">
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-500 w-4 h-4" /> Consultation
              notes and diagnosis
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-500 w-4 h-4" /> Prescription
              (if applicable)
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-500 w-4 h-4" /> Follow-up
              recommendations
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-500 w-4 h-4" /> Referrals (if
              needed)
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 rounded-lg transition">
            <Download size={18} /> Download Summary
          </button>
          <button className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 rounded-lg transition">
            <Star size={18} /> Rate Your Experience
          </button>
        </div>
      </div>

      <div className="w-full max-w-3xl bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl text-white text-center py-8 px-6 mb-8 shadow-sm">
        <h3 className="text-xl font-semibold mb-1">How was your experience?</h3>
        <p className="text-sm mb-4 opacity-90">
          Your feedback helps us provide better care
        </p>
        <div className="flex justify-center gap-3 mb-5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={30}
              className={`cursor-pointer transition ${
                rating >= star
                  ? "fill-yellow-300 text-yellow-300"
                  : "text-white"
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
        
        <button className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition">
          Submit Feedback
        </button>
      </div>

      <button
        onClick={() => navigate("/")}
        className="text-blue-600 border border-blue-200 px-6 py-2 rounded-lg hover:bg-blue-50 transition"
      >
        Return to Home
      </button>

      <p className="text-sm text-gray-500 mt-4">
        Need help? Contact us at{" "}
        <a
          href="mailto:support@virtualhealth.co.za"
          className="text-blue-600 hover:underline"
        >
          support@virtualhealth.co.za
        </a>
      </p>
    </div>
  );
};

export default ConsultationComplete;
