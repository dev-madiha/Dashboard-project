import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "./Api/axiosInstance";
import usePermission from "../Hook/usePermission";

const UserManag = () => {
  const canViewUsers = usePermission("user:view");
  const canAddUsers = usePermission("user:create");
  const canEditUsers = usePermission("patient:update");
  const canDeleteUsers = usePermission("patient:delete");

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await api.get("/auth/");
        setUsers(res.data);
        toast.success("Users loaded successfully!");
      } catch (err: any) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch user data. Please log in again.");
        toast.error("Failed to fetch user data!");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filtered = users.filter(
    (user) =>
      (status === "All" ||
        (status === "Active" && user.is_active) ||
        (status === "Inactive" && !user.is_active)) &&
      (user.username?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase()) ||
        user.role?.toLowerCase().includes(search.toLowerCase()))
  );

  const getStatusColor = (active: boolean) => {
    return active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700";
  };

  const navigate = useNavigate();
  const handleEdit = (user: any) => {
    if (!canEditUsers) return toast.error(" Permission denied!");
    navigate(`/admin/user/edit-user/${user.id}`, { state: user });
  };

  const handleAdd = () => {
    if (!canAddUsers) return toast.error(" Permission denied!");
    navigate("/admin/user/create");
  };

  const handleDelete = async (id: any) => {
    if (!canDeleteUsers) return toast.error(" Permission denied!");
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await api.delete(`/auth/${id}`);
      toast.success("User deleted successfully!");
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch {
      toast.error("Failed to delete user!");
    }
  };

  if (!canViewUsers) {
    return (
      <div className="p-6 text-center text-red-500 text-xl font-semibold">
        You don't have permission to view users
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          User Management
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          View and manage all registered users
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {["Total User", "Active", "Inactive", "Doctors"].map((title, i) => {
          let count = 0;
          if (title === "Total User") count = users.length;
          if (title === "Active")
            count = users.filter((u) => u.is_active).length;
          if (title === "Inactive")
            count = users.filter((u) => !u.is_active).length;
          if (title === "Doctors")
            count = users.filter((u) => u.role === "doctor").length;
          return (
            <div
              key={i}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]"
            >
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {title}
              </span>
              <h4 className="mt-3 font-bold text-gray-800 text-xl dark:text-white">
                {count}
              </h4>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl bg-white dark:bg-white/[0.03] p-6 border border-gray-200 dark:border-gray-800 shadow-[0_4px_20px_rgba(0,0,0,0.1)] space-y-5">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            All Users
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Registered users and their details
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between w-full">
          <input
            type="text"
            placeholder="Search by username, email, or role"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/2 rounded-lg border bg-gray-100 border-gray-300 dark:border-gray-700 px-3 py-2 text-gray-700 dark:text-gray-200 focus:border-blue-500 focus:outline-none"
          />
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* <button
              onClick={handleAdd}
              className="px-3 py-3 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
            >
              + Add New User
            </button> */}
            {canAddUsers && (
              <button
                onClick={handleAdd}
                className="px-3 py-3 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
              >
                + Add New User
              </button>
            )}
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 px-3 py-2 text-gray-700 dark:text-gray-200 focus:border-blue-500 focus:outline-none"
            >
              <option value="All">All Users</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <div className="flex justify-center items-center space-x-3">
              <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 dark:text-gray-400">
                Loading users...
              </p>
            </div>
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 shadow-inner hidden sm:block">
            <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800">
              <thead>
                <tr className="text-left text-sm font-medium text-[#383838] bg-gray-100 dark:text-gray-400">
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Username</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filtered.length > 0 ? (
                  filtered.map((user) => (
                    <tr
                      key={user.id}
                      className="text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition"
                    >
                      <td className="px-6 py-3 font-medium">{user.id}</td>
                      <td className="px-6 py-3">{user.username}</td>
                      <td className="px-6 py-3">{user.email}</td>
                      <td className="px-6 py-3 capitalize">{user.role}</td>
                      <td className="px-6 py-3">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
                            user.is_active
                          )}`}
                        >
                          {user.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-3 flex items-center gap-3">
                        {canEditUsers && (
                          <button
                            onClick={() => handleEdit(user)}
                            className="px-3 py-1 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                          >
                            Edit
                          </button>
                        )}
                        {canDeleteUsers && (
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="px-3 py-1 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                    >
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManag;
