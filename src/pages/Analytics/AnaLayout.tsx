

import React from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  GroupIcon,
  BoxIconLine,
} from "../../icons";

import Badge from "../../components/ui/badge/Badge";
import { Link, Outlet, useLocation } from "react-router-dom";

const AnaLayout = () => {
  const location = useLocation();
  const buttons = [
    { label: "Overview", path: "overview" },
    { label: "Revenue", path: "revenue" },
    { label: "Consolations", path: "consolation" },
    { label: "Prescriptions", path: "system" },
  ];

  return (
    <>
    
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 md:gap-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Redemption Rate
            </span>
            <div className="flex items-center justify-center w-12 h-12 bg-purple-400 rounded-xl dark:bg-gray-800">
              <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
            </div>
          </div>

          <div className="flex flex-col mt-5">
            <div>
              <h4 className="mt-2  text-gray-800 text-title-sm dark:text-white/90">
                91.9%
              </h4>
            </div>
            <Badge color="success">
              <ArrowUpIcon />
              11.01%
            </Badge>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Avg. Wait Time
            </span>
            <div className="flex items-center justify-center w-12 h-12 bg-green-400 rounded-xl dark:bg-purple-500">
              <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
            </div>
          </div>
          <div className="flex flex-col mt-5">
            <div>
              <h4 className="mt-2  text-gray-800 text-title-sm dark:text-white/90">
                4.2 min
              </h4>
            </div>

            <Badge color="error">
              <ArrowDownIcon />
              9.05%
            </Badge>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Patient Satisfaction
            </span>
            <div className="flex items-center justify-center w-12 h-12 bg-blue-400 rounded-xl dark:bg-gray-800">
              <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
            </div>
          </div>

          <div className="flex flex-col mt-5">
            <div>
              <h4 className="mt-2  text-gray-800 text-title-sm dark:text-white/90">
                4.8/5.0
              </h4>
            </div>

            <Badge color="error">
              <ArrowDownIcon />
              9.05%
            </Badge>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Monthly Revenue
            </span>
            <div className="flex items-center justify-center w-12 h-12 bg-orange-300 rounded-xl dark:bg-gray-800">
              <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
            </div>
          </div>

          <div className="flex flex-col mt-5">
            <div>
              <h4 className="mt-2  text-gray-800 text-title-sm dark:text-white/90">
                R 47,800
              </h4>
            </div>

            <Badge color="error">
              <ArrowDownIcon />
              9.05%
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        {buttons.map((btn) => {
          const isActive = location.pathname === btn.path;
          return (
            <Link
              key={btn.label}
              to={btn.path}
              className={`text-center font-medium py-2 rounded-xl shadow-sm transition duration-300 border ${
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
    </>
  );
};

export default AnaLayout;
