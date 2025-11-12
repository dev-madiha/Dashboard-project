import React, { useState } from "react";

const Security = () => {
 
  const securityData = {
    header: {
      title: "Security Settings",
      subtitle: "Manage security preferences and notification access.",
    },
    sections: [
      {
        title: "Voucher Redemption Notifications",
        description: "Receive an email when a voucher is redeemed.",
        key: "voucherNotif",
      },
      {
        title: "Daily Summary Reports",
        description: "Receive daily activity summaries via email.",
        key: "dailyNotif",
      },
      {
        title: "Email Notifications",
        description: "Receive updates about your account via email.",
        key: "emailNotif",
      },
    ],
    passwordSection: {
      title: "Change password",
      fields: [
        { label: "Current password", name: "currentPassword" },
        { label: "New password", name: "newPassword" },
        { label: "Confirm password", name: "confirmPassword" },
      ],
    },
    button: {
      text: "Save Security Preferences",
    },
  };

  const [toggles, setToggles] = useState({
    voucherNotif: true,
    dailyNotif: false,
    emailNotif: false,
  });

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error on change
  };

  const validateForm = () => {
    
    let newErrors: any = {};
    let valid = true;

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
      valid = false;
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
      valid = false;
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
      valid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
      valid = false;
    } else if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert("✅ Password updated successfully!");
    }
  };

  interface ToggleProps {
    enabled: boolean;
    onChange: () => void;
  }

  const Toggle: React.FC<ToggleProps> = ({ enabled, onChange }) => (
    <button
      type="button"
      onClick={onChange}
      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
        enabled ? "bg-blue-600" : "bg-gray-300"
      }`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          enabled ? "translate-x-6" : ""
        }`}
      ></div>
    </button>
  );

  return (
    <>
      <div className="p-8">
        <h1 className="text-3xl font-semibold text-gray-800">
          {securityData.header.title}
        </h1>
        <p className="text-gray-500 mt-1">{securityData.header.subtitle}</p>
      </div>

      <div className="space-y-8 bg-gray-50 min-h-screen">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
          {securityData.sections.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-800">
                  {item.title}
                </h2>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
              <Toggle
                enabled={toggles[item.key as keyof typeof toggles]}
                onChange={() => handleToggle(item.key as keyof typeof toggles)}
              />
            </div>
          ))}

          <div>
            <h1 className="text-[18px] py-3 font-semibold text-gray-700">
              {securityData.passwordSection.title}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              {securityData.passwordSection.fields.map((field, idx) => (
                <div key={idx} className="flex flex-col">
                  <label className="font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <input
                    className={`bg-gray-100 py-3 px-3 rounded outline-none border ${
                      errors[field.name as keyof typeof errors]
                        ? "border-red-500"
                        : "border-transparent"
                    }`}
                    type="password"
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                  />
                  {errors[field.name as keyof typeof errors] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[field.name as keyof typeof errors]}
                    </p>
                  )}
                </div>
              ))}

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                {securityData.button.text}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Security;
