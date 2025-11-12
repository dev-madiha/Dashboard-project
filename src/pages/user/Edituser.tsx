import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PageMeta from "../../components/common/PageMeta";
import api from "../Api/axiosInstance";
import { ToastContainer, toast } from "react-toastify";

const Edituser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsFetching(true);
        if (state?.username && state?.email) {
          setUsername(state.username);
          setEmail(state.email);
          return;
        }

        const response = await api.get(`/auth/${id}`);
        setUsername(response.data.username);
        setEmail(response.data.email);
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("Failed to load user details");
      } finally {
        setIsFetching(false);
      }
    };

    fetchUser();
  }, [id, state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await api.put(`/auth/${id}`, { username, email });

      toast.success(res.data?.message || "User updated successfully!");

      setTimeout(() => navigate("/admin/users"), 1000);
    } catch (error: any) {
      console.error("Error updating user:", error);
      if (Array.isArray(error.response?.data?.detail)) {
        error.response.data.detail.forEach((err: any) =>
          toast.error(err.msg || "Validation error")
        );
      } else if (typeof error.response?.data?.detail === "string") {
        toast.error(error.response.data.detail);
      } else {
        toast.error("Failed to update user");
      }
    } finally {
      setLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading user details...
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <PageMeta title="Edit User" description="Edit user details" />

      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Edit User
        </h1>

        <div className="rounded-2xl bg-white dark:bg-white/[0.03] p-6 border border-gray-200 dark:border-gray-800 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Username
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/admin/users")}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edituser;
