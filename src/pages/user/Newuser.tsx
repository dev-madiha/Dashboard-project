/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import PageMeta from "../../components/common/PageMeta";
import api from "../Api/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Newuser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState<{ key: string; value: string }[]>([]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get("/auth/roles");
        setRoles(response.data.roles || []);
        // console.log(response.data.roles);
      } catch (error) {
        console.error("Error fetching roles:", error);
        toast.error("Failed to load roles");
      }
    };

    fetchRoles();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password || !role) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirmPass) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/register", {
        username,
        email,
        password,
        role,
      });

      toast.success("User created successfully!");
      navigate("/admin/users");
    } catch (error: any) {
      console.error("Error creating user:", error);
      if (error.response?.data?.detail) {
        toast.error(error.response.data.detail);
      } else {
        toast.error("Failed to create user. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <PageMeta
        title="Add New User | TailAdmin Dashboard"
        description="Add new user details for admin dashboard"
      />

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Add New User
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Fill in the form below to create a new user account.
          </p>
        </div>

        <div className="rounded-2xl bg-white dark:bg-white/[0.03] p-6 border border-gray-200 dark:border-gray-800 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-3 py-2 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-3 py-2 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-3 py-2 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-3 py-2 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-3 py-2 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Role</option>
                {roles.length > 0 ? (
                  roles.map((r) => (
                    <option key={r.key} value={r.value}>
                      {r.value}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading roles...</option>
                )}
              </select>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 font-medium text-white rounded-lg shadow-md transition duration-200 ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Saving..." : "Save User"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Newuser;
