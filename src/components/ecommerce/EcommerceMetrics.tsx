import {
  ArrowDownIcon,
  ArrowUpIcon,
  GroupIcon,
  BoxIconLine,
} from "../../icons";
import Badge from "../ui/badge/Badge";
import React from "react";

export default function EcommerceMetrics() {
  // JSON-style configuration for metrics
  const metricsJSON = `
  {
    "cards": [
      {
        "title": "Customers",
        "value": "3,782",
        "trend": {
          "type": "up",
          "percentage": "11.01%",
          "color": "success"
        },
        "icon": "GroupIcon",
        "iconBg": "bg-purple-400"
      },
      {
        "title": "Orders",
        "value": "5,359",
        "trend": {
          "type": "down",
          "percentage": "9.05%",
          "color": "error"
        },
        "icon": "BoxIconLine",
        "iconBg": "bg-green-400"
      },
      {
        "title": "Orders",
        "value": "5,359",
        "trend": {
          "type": "down",
          "percentage": "9.05%",
          "color": "error"
        },
        "icon": "BoxIconLine",
        "iconBg": "bg-blue-400"
      },
      {
        "title": "Orders",
        "value": "5,359",
        "trend": {
          "type": "down",
          "percentage": "9.05%",
          "color": "error"
        },
        "icon": "BoxIconLine",
        "iconBg": "bg-orange-300"
      }
    ]
  }
  `;
  
  const data = JSON.parse(metricsJSON);
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

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 md:gap-6">
      {data.cards.map((card: any, index: number) => (
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
