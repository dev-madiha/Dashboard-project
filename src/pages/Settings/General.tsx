import React, { useEffect, useState } from "react";
import api from "../Api/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosError } from "axios";
import { useAuth } from "../../context/AuthContext";

const General = () => {
  const { user } = useAuth();
  const hasPermission = user?.permissions?.includes("settings:update");

  const [formData, setFormData] = useState({
    company_name: "",
    support_email: "",
    support_phone: "",
    website_url: "",
    voucher_validity_days: "",
    voucher_price: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchSetting = async () => {
      try {
        setLoading(true);
        const res = await api.get(`${API_BASE_URL}/settings`);
        const data = res.data;

        setFormData({
          company_name: data.company_name || "",
          support_email: data.support_email || "",
          support_phone: data.support_phone || "",
          website_url: data.website_url || "",
          voucher_validity_days: data.voucher_validity_days || "",
          voucher_price: data.voucher_price || "",
        });
      } catch (error: unknown) {
        const err = error as AxiosError<{ detail?: string }>;
        toast.error(err.response?.data?.detail || "Failed to load settings.");
      } finally {
        setLoading(false);
      }
    };

    fetchSetting();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasPermission) return; // prevent edits
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let newErrors: Record<string, string> = {};
    let valid = true;

    if (!formData.company_name.trim()) {
      newErrors.company_name = "Company Name is required";
      valid = false;
    }
    if (!formData.support_email.trim()) {
      newErrors.support_email = "Support Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.support_email)) {
      newErrors.support_email = "Please enter a valid email address";
      valid = false;
    }
    if (!formData.website_url.trim()) {
      newErrors.website_url = "Website URL is required";
      valid = false;
    } else if (!/^https?:\/\/[^\s]+$/.test(formData.website_url)) {
      newErrors.website_url = "URL must start with http/https";
      valid = false;
    }
    if (!formData.support_phone.trim()) {
      newErrors.support_phone = "Phone number is required";
      valid = false;
    }
    if (!formData.voucher_validity_days) {
      newErrors.voucher_validity_days = "Default Validity is required";
      valid = false;
    }
    if (!formData.voucher_price) {
      newErrors.voucher_price = "Voucher Price is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!hasPermission) {
      toast.error("You do not have permission to update settings.");
      return;
    }

    if (!validateForm()) return;

    try {
      setLoading(true);
      const payload = {
        company_name: formData.company_name,
        support_email: formData.support_email,
        support_phone: formData.support_phone,
        website_url: formData.website_url,
        voucher_validity_days: Number(formData.voucher_validity_days),
        voucher_price: Number(formData.voucher_price),
        notify_voucher_redemption: true,
        notify_daily_summary: false,
        notify_email_updates: true,
        notify_system_alerts: true,
        system_version: "v2.5.1",
        extra: {},
      };

      await api.put(`${API_BASE_URL}/settings`, payload);
      toast.success("Settings updated successfully!");
    } catch (error: unknown) {
      const err = error as AxiosError<{ detail?: string }>;
      toast.error(err.response?.data?.detail || "Failed to update settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <ToastContainer />

      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl font-semibold text-gray-800">Settings</h1>
        <p className="text-gray-500 mt-1">
          Manage system configuration and preferences
        </p>
      </div>

      {!hasPermission && (
        <p className="text-red-600 text-center font-medium mb-4">
          ⚠ You do not have permission to update settings. View only mode.
        </p>
      )}

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-8">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                General Settings
              </h2>
              <p className="text-gray-500 mt-1">Basic system configuration</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {[
                  { label: "Company Name", name: "company_name" },
                  { label: "Support Email", name: "support_email", type: "email" },
                  { label: "Support Phone", name: "support_phone" },
                  { label: "Website URL", name: "website_url", type: "url" },
                ].map((field) => (
                  <div key={field.name} className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <input
                      name={field.name}
                      type={field.type || "text"}
                      value={(formData as any)[field.name]}
                      onChange={handleChange}
                      disabled={!hasPermission}
                      className={`border ${
                        errors[field.name]
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 ${
                        !hasPermission ? "bg-gray-100 cursor-not-allowed" : ""
                      }`}
                    />
                    {errors[field.name] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200"></div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Voucher Settings</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {[
                  { label: "Default Validity (days)", name: "voucher_validity_days", type: "number" },
                  { label: "Voucher Price", name: "voucher_price", type: "number" },
                ].map((field) => (
                  <div key={field.name} className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <input
                      name={field.name}
                      type={field.type}
                      value={(formData as any)[field.name]}
                      onChange={handleChange}
                      disabled={!hasPermission}
                      className={`border ${
                        errors[field.name]
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 ${
                        !hasPermission ? "bg-gray-100 cursor-not-allowed" : ""
                      }`}
                    />
                    {errors[field.name] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 flex justify-center md:justify-end">
              <button
                type="submit"
                disabled={loading || !hasPermission}
                className={`bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 ${
                  loading || !hasPermission
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default General;
