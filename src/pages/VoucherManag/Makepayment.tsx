import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

const MakePaymentModal = ({ isOpen, onClose, onPaymentSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [reference, setReference] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handlePayment = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");

      const res = await axios.post(
        `${API_BASE_URL}/payments/`, 
        {
          amount,
          payment_method: paymentMethod,
          reference,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      onPaymentSuccess(res.data);
      onClose();
    } catch (err) {
      console.error("Error processing payment:", err);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Complete Payment
        </h2>
        <p className="text-gray-500 mb-5">
          Enter payment details to complete voucher purchase.
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Payment Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-green-400 outline-none"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-green-400 outline-none"
            >
              <option value="credit_card">Credit Card</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="cash">Cash</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Payment Reference
            </label>
            <input
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-green-400 outline-none"
              placeholder="Enter reference number (optional)"
            />
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full py-2 mt-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
          >
            {loading ? "Processing..." : "Confirm Payment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MakePaymentModal;
