import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Video, Clock } from "lucide-react";

const VoucherPage = () => {
  const navigate = useNavigate();
  const [voucher, setVoucher] = useState("");

  const cards = [
    {
      id: 1,
      icon: ShieldCheck,
      title: "Secure & Private",
      desc: "POPI Act compliant",
      color: "#3B82F6",
      bg: "#E0ECFF",
    },

    {
      id: 2,
      icon: Video,
      title: "HD Video Call",
      desc: "Face-to-face consultation",
      color: "#F97316",
      bg: "#FFECDC",
    },

    {
      id: 3,
      icon: Clock,
      title: "Quick Access",
      desc: "Average wait under 10 min",
      color: "#8B5CF6",
      bg: "#EEE8FF",
    },
  ];

  const handleNext = () => {
    if (voucher.length === 16) {
      navigate("/details");
    } else {
      alert("Please enter a valid 16-digit voucher number");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10 px-4">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="text-[28px] sm:text-[36px] font-bold text-blue-600 mb-2">
            Redeem Your Virtual Doctor's Visit
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Enter your voucher number to get started with your consultation.
          </p>
        </div>
     
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {cards.map((item) => (
            <div
              key={item.id}
              className="border bg-white rounded-2xl py-6 px-4 hover:shadow-md transition"
            >
              <div className="flex flex-col items-center gap-3">
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: item.bg, color: item.color }}
                >
                  <item.icon size={26} />
                </div>
                <div className="text-center">
                  <h2 className="font-semibold text-gray-800">{item.title}</h2>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}

        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border">
          <label className="block text-gray-700 font-semibold text-sm mb-1">
            Enter Voucher Details
          </label>
          <p className="text-xs text-gray-500 mb-4">
            Your 16-digit voucher number can be found on your physical voucher
            card.
            
          </p>

          <input
            type="text"
            placeholder="0000 0000 0000 0000"
            maxLength={16}
            value={voucher}
            onChange={(e) => setVoucher(e.target.value.replace(/\D/g, ""))}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-5 text-center text-lg tracking-widest font-mono focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition"
          >
            Verify Voucher
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoucherPage;
