import React, { useState } from "react";

const Notifications = () => {
  // 🧠 All hardcoded data moved to JSON
  const notificationJSON = `
  {
    "header": {
      "title": "Notification Settings",
      "subtitle": "Configure your email and system notifications"
    },
    "notifications": [
      {
        "id": "voucherNotif",
        "title": "Voucher Redemption Notifications",
        "description": "Receive an email when a voucher is redeemed",
        "default": true
      },
      {
        "id": "dailyNotif",
        "title": "Daily Summary Reports",
        "description": "Receive daily activity summaries via email",
        "default": false
      },
      {
        "id": "emailNotif",
        "title": "Email Notifications",
        "description": "Receive updates about your account via email",
        "default": false
      },
      {
        "id": "systemNotif",
        "title": "System Notifications",
        "description": "Get notified about important system activities",
        "default": true
      }
    ],
    "button": {
      "text": "Save Notification Preferences"
    }
  }
  `;

  // Parse JSON data
  const notificationData = JSON.parse(notificationJSON);

  // Initialize state for all notifications dynamically
  const initialState = notificationData.notifications.reduce((acc, item) => {
    acc[item.id] = item.default;
    return acc;
  }, {});

  const [toggles, setToggles] = useState(initialState);

  // 🔁 Handle toggle change
  const handleToggle = (id: string) => {
    setToggles((prev: Record<string, boolean>) => ({ ...prev, [id]: !prev[id] }));
  };

  // ✅ Reusable Toggle Component
  type ToggleProps = {
    enabled: boolean;
    onChange: () => void;
  };

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
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-800">
          {notificationData.header.title}
        </h1>
        <p className="text-gray-500 mt-1">{notificationData.header.subtitle}</p>
      </div>

      {/* Notification Settings */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
        {notificationData.notifications.map((item) => (
          
          <div
            key={item.id}
            className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-none"
          >
            <div>
              <h2 className="text-lg font-medium text-gray-800">
                {item.title}
              </h2>
              <p className="text-gray-500 text-sm">{item.description}</p>
            </div>
            <Toggle
              enabled={toggles[item.id]}
              onChange={() => handleToggle(item.id)}
            />
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
          {notificationData.button.text}
        </button>
      </div>
    </div>
  );
};

export default Notifications;
