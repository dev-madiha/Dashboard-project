

import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
const Layout = () => {
  const location = useLocation();

  const buttons = [
    { label: "Profile", path: "profile" },
    { label: "Notification", path: "notification" },
    { label: "Security", path: "security" },
    { label: "preference", path: "system" },
  ];
  return (

    <div className=" space-y-10 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-semibold text-gray-800">Settings</h1>
        <p className="text-gray-500 mt-1">
          Manage system configuration and preferences
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {buttons.map((btn) => {
            
          const isActive = location.pathname.endsWith(btn.path);
          return (
            <Link
              key={btn.label}
              to={btn.path}
              className={`text-center font-medium py-3 rounded-xl shadow-sm transition duration-300 border ${
                isActive
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 hover:bg-blue-600 hover:text-white border-gray-200"
              }`}
            >
              {btn.label}
            </Link>
          );
        })}
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
