import React, { useState } from "react";

const General = () => {
  const generalJSON = `
  {
    "header": {
      "title": "Professional Information",
      "subtitle": "Your professional details and qualifications"
    },
    "sections": [
      {
        "id": "general-settings",
        "title": "Professional Information",
        "subtitle": "Basic system configuration",
        "fields": [
          {
            "label": "First Name",
            "placeholder": "Enter First name",
            "type": "text"
          },
          {
            "label": "Last Name",
            "placeholder": "Enter Last name",
            "type": "text"
          },
          {
            "label": "Support Email",
            "placeholder": "Enter support email",
            "type": "email"
          },
          {
            "label": "Practice Number",
            "placeholder": "Enter practice number",
            "type": "text"
          },
          {
            "label": "Support Phone",
            "placeholder": "Enter phone number",
            "type": "text"
          },
          {
            "label": "Website URL",
            "placeholder": "Enter website URL",
            "type": "url"
          }
        ]
      }
    ],
    "button": {
      "text": "Save Changes"
    }
  }
  `;

  const generalData = JSON.parse(generalJSON);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { placeholder, value } = e.target;
    setFormData((prev) => ({ ...prev, [placeholder]: value }));
    setErrors((prev) => ({ ...prev, [placeholder]: "" }));
  };

  const validateForm = () => {
    let newErrors: Record<string, string> = {};
    let valid = true;

    generalData.sections.forEach((section: any) => {
      section.fields.forEach((field: any) => {
        const value = formData[field.placeholder] || "";
        const key = field.placeholder;

        if (!value.trim()) {
          newErrors[key] = `${field.label} is required`;
          valid = false;
        } else {
          if (field.type === "email" && !/\S+@\S+\.\S+/.test(value)) {
            newErrors[key] = "Please enter a valid email address";
            valid = false;
          } else if (
            field.type === "url" &&
            !/^https?:\/\/[^\s]+$/.test(value)
          ) {
            newErrors[key] = "Please enter a valid URL (start with http/https)";
            valid = false;
          } else if (field.label.includes("Phone") && value.length < 7) {
            newErrors[key] = "Phone number must be at least 7 digits";
            valid = false;
          }
        }
      });
    });
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form saved successfully!");

    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-0 lg:p-6">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-8">
        <form onSubmit={handleSubmit}>
          {generalData.sections.map((section: any, index: number) => (
            <div key={index} className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {section.title}
                </h2>
                {section.subtitle && (
                  <p className="text-gray-500 mt-1">{section.subtitle}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {section.fields.map((field: any, idx: number) => (
                  <div key={idx} className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.placeholder] || ""}
                      onChange={handleChange}
                      className={`border ${
                        errors[field.placeholder]
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors[field.placeholder] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[field.placeholder]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="pt-6 flex justify-center md:justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              {generalData.button.text}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default General;
