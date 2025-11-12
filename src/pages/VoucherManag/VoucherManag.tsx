import React, { useState, useEffect } from "react";
import GenerateVou from "./GenerateVou";
import api from "../Api/axiosInstance";

const Vouchermanag = () => {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const uiText = {
    pageTitle: "Voucher Management",
    pageSubtitle: "Create, view, and manage prepaid doctor visit vouchers",
    tableTitle: "All Vouchers",
    tableSubtitle: "View and manage all generated vouchers",
    searchPlaceholder: "Search by voucher number or batch.",
    noData: "No vouchers found",
    statusLabel: "All Status",
  };

  const summaryCards = [
    { title: "Customers", value: 3560 },
    { title: "Orders", value: 2875 },
    { title: "Vouchers", value: 690 },
    { title: "Revenue", value: 15720 },
  ];

  const statusColors: Record<string, { bg: string; text: string }> = {
    active: { bg: "bg-green-100", text: "text-green-700" },
    used: { bg: "bg-blue-100", text: "text-blue-700" },
    expired: { bg: "bg-red-100", text: "text-red-700" },
  };

  const fetchVouchers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      const res = await api.get(`${API_BASE_URL}/vouchers/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVouchers(res.data);
      setError("");
    } catch (err) {
      console.error("Error fetching vouchers:", err);
      setError("Failed to load vouchers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchFilteredVouchers = async (
    searchValue = "",
    statusValue = "All"
  ) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      let url = `${API_BASE_URL}/vouchers/filter?`;

      if (searchValue) url += `search=${encodeURIComponent(searchValue)}&`;
      if (statusValue !== "All")
        url += `status=${encodeURIComponent(statusValue)}&`;

      const res = await api.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });


      setVouchers(res.data);
      setError("");
    } catch (err) {
      console.error("Error filtering vouchers:", err);
      setError("Failed to filter vouchers. Please try again.");
    } finally {
      setLoading(false);
    }
    
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (search || status !== "All") {
        fetchFilteredVouchers(search, status);
      } else {
        fetchVouchers();
      }
    }, 500);
    return () => clearTimeout(delay);
  }, [search, status]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            {uiText.pageTitle}
          </h1>
          <p className="text-gray-500">{uiText.pageSubtitle}</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
        >
          Generate Voucher
        </button>
        <GenerateVou
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onVoucherCreated={(newVoucher) => {
            const voucherObj = {
              code: newVoucher.codes[0],
              batch_id: newVoucher.batch_id,
              status: "active",
              issued_at: new Date().toISOString(),
            };
            setVouchers((prev) => [voucherObj, ...prev]);
          }}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {summaryCards.map((card, index) => (
          <div
            key={index}
            className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm text-center"
          >
            <h3 className="text-gray-500 text-sm">{card.title}</h3>
            <p className="text-2xl font-semibold text-gray-800">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white p-6 border border-gray-200 shadow-sm space-y-5">
        <h1 className="text-2xl font-semibold text-gray-800">
          {uiText.tableTitle}
        </h1>
        <p className="text-gray-500">{uiText.tableSubtitle}</p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <input
            type="text"
            placeholder={uiText.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/2 rounded-lg border bg-gray-100 border-gray-300 px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full sm:w-1/4 rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none"
          >
            <option value="All">{uiText.statusLabel}</option>
            {Object.keys(statusColors).map((key, i) => (
              <option key={i} value={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 py-6">Loading vouchers...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-6">{error}</p>
        ) : vouchers.length === 0 ? (
          <p className="text-center text-gray-500 py-6">{uiText.noData}</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="min-w-full divide-y divide-gray-100 hidden sm:table">
              <thead>
                <tr className="text-left text-sm font-medium text-gray-700 bg-gray-100">
                  <th className="px-6 py-3">Voucher Code</th>
                  <th className="px-6 py-3">Batch ID</th>
                  <th className="px-6 py-3">Issued At</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {vouchers.map((voucher, i) => (
                  <tr
                    key={i}
                    className="text-sm text-gray-700 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-3">{voucher.code}</td>
                    <td className="px-6 py-3">{voucher.batch_id}</td>
                    <td className="px-6 py-3">
                      {new Date(voucher.issued_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                          statusColors[voucher.status?.toLowerCase()]?.bg ||
                          "bg-gray-100"
                        } ${
                          statusColors[voucher.status?.toLowerCase()]?.text ||
                          "text-gray-700"
                        }`}
                      >
                        {voucher.status || "Unknown"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="sm:hidden space-y-4 p-3">
              {vouchers.map((voucher, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-gray-200 bg-gray-50"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{voucher.code}</span>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        statusColors[voucher.status?.toLowerCase()]?.bg ||
                        "bg-gray-100"
                      } ${
                        statusColors[voucher.status?.toLowerCase()]?.text ||
                        "text-gray-700"
                      }`}
                    >
                      {voucher.status || "Unknown"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    <strong>Batch:</strong> {voucher.batch_id}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Issued:</strong>{" "}
                    {new Date(voucher.issued_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vouchermanag;
