"use client";
import React, { useEffect, useState } from "react";
import api from "../../pages/Api/axiosInstance";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  GroupIcon,
  BoxIconLine,
} from "../../icons";
import Badge from "../ui/badge/Badge";

export default function EcommerceMetrics() {
  const [summary, setSummary] = useState({
    total_voucher: 0,
    active_voucher: 0,
    total_patients: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // ✅ Fetch voucher stats
  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await api.get(`${API_BASE_URL}/vouchers/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSummary(res.data);
      } catch (err: any) {
        console.error("Error fetching stats:", err);
        setError("Failed to load voucher statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchVouchers();
  }, [API_BASE_URL]);

  // ✅ Define cards dynamically using API data
  const cards = [
    {
      title: "Total Vouchers",
      value: summary.total_voucher || 0,
      trend: { type: "up", percentage: "+8.4%", color: "success" },
      icon: "GroupIcon",
      iconBg: "bg-purple-400",
    },
    {
      title: "Active Vouchers",
      value: summary.active_voucher || 0,
      trend: { type: "up", percentage: "+5.6%", color: "success" },
      icon: "BoxIconLine",
      iconBg: "bg-green-400",
    },
    {
      title: "Total Patients",
      value: summary.total_patients || 0,
      trend: { type: "down", percentage: "-3.2%", color: "error" },
      icon: "BoxIconLine",
      iconBg: "bg-orange-300",
    },
  ];

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "GroupIcon":
        return <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />;
      case "BoxIconLine":
        return <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />;
      default:
        return null;
    }
  };

  const getTrendIcon = (type: string) =>
    type === "up" ? <ArrowUpIcon /> : <ArrowDownIcon />;

  // ✅ Loading & error states
  if (loading)
    return (
      <div className="flex justify-center py-10 text-gray-500">
        Loading voucher stats...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center py-10 text-red-500">
        {error}
      </div>
    );

  // ✅ Render metrics
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
        >
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {card.title}
            </span>
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-xl ${card.iconBg} dark:bg-gray-800`}
            >
              {getIconComponent(card.icon)}
            </div>
          </div>

          <div className="flex flex-col mt-5">
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {card.value}
            </h4>
            <Badge color={card.trend.color}>
              {getTrendIcon(card.trend.type)}
              {card.trend.percentage}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
