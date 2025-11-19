import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const Unauthorized = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleGoBack = () => {
    if (user) {
      switch (user.role) {
        case "admin":
          navigate("/admin");
          break;
        case "doctor":
          navigate("/doctor");
          break;
        case "patient":
          navigate("/patient/patientdashboard");
          break;
      
      }
    } else {
      navigate("/signin");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/auth/signin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 mb-6">
            <svg
              className="w-10 h-10 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            You do not have permission to access this page.{" "}
            {user && (
              <span className="block mt-2 text-sm">
                <strong className="text-indigo-600 dark:text-indigo-400">
                  {user.role}
                </strong>{" "}
                login
              </span>
            )}
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleGoBack}
            className="w-full px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors"
          >
            Dashboard
          </button>

          <button
            onClick={handleLogout}
            className="w-full px-6 py-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-lg font-medium transition-colors"
          >
            Logout
          </button>
        </div>

        {/* <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Note:</strong> Agar aapko lagta hai ke aapko is page ki
            access honi chahiye, to apne administrator se contact karein.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Unauthorized;
