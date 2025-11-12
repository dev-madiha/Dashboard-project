import React, { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

const GenerateVou = ({ isOpen, onClose,onVoucherCreated }) => {
  const [loading, setLoading] = useState(false);
  const [voucherNumber, setVoucherNumber] = useState("1");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleGenerate = async () => {
  if (!voucherNumber) {
    alert("Please enter the number of vouchers to generate.");
    return;
  }

  try {
    setLoading(true);
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      console.error("⚠️ No user found in localStorage!");
      alert("Please log in first.");
      return;
    }

    const user = JSON.parse(storedUser);
    const token = user.access_token;
    console.log("🔐 Using token:", token);

    const res = await axios.post(
      `${API_BASE_URL}/vouchers/bundle?total=${voucherNumber}`,
      {},

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

    );

    console.log(" Voucher API response:", res.data);
    onVoucherCreated(res.data);
    alert("Voucher generated successfully!");
    
    onClose();
  } catch (err) {
    console.error("❌ Error generating voucher:", err);
    alert("Failed to generate voucher. Please try again.");
  } finally {
    setLoading(false);
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg mx-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Generate New Voucher
        </h2>
        <p className="text-gray-600 mb-4">
          Create new prepaid doctor visit vouchers in bulk.
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Number Of Vouchers
            </label>
            <input
              type="number"
              value={voucherNumber}
              onChange={(e) => setVoucherNumber(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-green-400 outline-none"
              placeholder="Enter number of vouchers"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Voucher Information
            </label>
            <div className="bg-gray-50 rounded-xl p-5">
              <h1 className="font-semibold text-gray-800 mb-2">
                Voucher Details
              </h1>
              <ul className="text-sm text-gray-600 list-disc ml-5 space-y-1">
                <li>16-digit unique voucher numbers</li>
                <li>Valid for 12 months from creation</li>
                <li>One-time use per voucher</li>
                <li>Instantly activated</li>
              </ul>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className={`w-full py-2 mt-4 rounded-lg text-white transition ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {loading ? "Generating..." : "Generate Voucher"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateVou;
