import React, { useState } from "react";

const System = () => {

  const systemData = {
    header: {
      title: "System Settings",
      subtitle: "Manage system alerts and operational preferences",
    },
    notifications: [
      {
        title: "Voucher Redemption Notifications",
        description: "Receive an email when a voucher is redeemed",
        key: "voucherNotif" as keyof typeof toggles,
      },
      {
        title: "Daily Summary Reports",
        description: "Receive daily activity summaries via email",
        key: "dailyNotif" as keyof typeof toggles,
      },
      {
        title: "Email Notifications",
        description: "Receive updates about your account via email",
        key: "emailNotif" as keyof typeof toggles,
      },
      {
        title: "System Alerts",
        description: "Enable alerts for important system events",
        key: "systemNotif" as keyof typeof toggles,
      },
    ],
    systemInfo: {
      title: "System Information",
      items: [
        { label: "System Version", value: "v2.5.1 (Stable)" },
        { label: "Last Update", value: "Oct 10, 2025" },
        { label: "Server Status", value: "Running", status: "success" },
        { label: "Database Status", value: "Connected", status: "success" },
      ],
    },
  };

 
  const [toggles, setToggles] = useState({
    voucherNotif: true,
    dailyNotif: false,
    emailNotif: false,
    systemNotif: true,
  });

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };


  interface ToggleProps {
    enabled: boolean;
    onChange: () => void;
  }

  const Toggle: React.FC<ToggleProps> = ({ enabled, onChange }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
        enabled ? "bg-blue-600" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  return (
    <div className=" space-y-10 bg-gray-50 min-h-screen">
  
      <div>
        <h1 className="text-3xl font-semibold text-gray-800">
          {systemData.header.title}
        </h1>
        <p className="text-gray-500 mt-1">{systemData.header.subtitle}</p>
      </div>

    
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
        {systemData.notifications.map((notif, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-800">
                {notif.title}
              </h2>
              <p className="text-gray-500 text-sm">{notif.description}</p>
            </div>
            <Toggle
              enabled={toggles[notif.key]}
              onChange={() => handleToggle(notif.key)}
            />
          </div>
        ))}

  
        <div className="  min-h-screen">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            {systemData.systemInfo.title}
          </h1>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {systemData.systemInfo.items.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
              >
                <h2 className="text-lg font-medium text-gray-800">
                  {item.label}
                </h2>
                <p
                  className={`text-sm ${
                    item.status === "success"
                      ? "text-green-600 font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default System;
