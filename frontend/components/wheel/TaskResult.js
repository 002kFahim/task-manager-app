"use client";

import React from "react";
import Button from "@/components/ui/Button";
import { CalendarDays } from "lucide-react";

const TaskResult = ({ task, onStartTask, onSpinAgain, onClose }) => {
  const getCategoryColor = (category) => {
    const colors = {
      Work: "bg-blue-500",
      Personal: "bg-purple-500",
      Health: "bg-green-500",
      Learning: "bg-orange-500",
      Entertainment: "bg-pink-500",
      Nature: "bg-emerald-500",
      Family: "bg-violet-500",
      Friends: "bg-red-500",
      "Art and Craft": "bg-orange-600",
      Meditation: "bg-cyan-500",
      Other: "bg-gray-500",
    };
    return colors[category] || "bg-gray-500";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Done":
        return "text-[#21D789] bg-green-50 border-green-200";
      case "In Progress":
        return "text-[#DD9221] bg-yellow-50 border-yellow-200";
      case "Pending":
        return "text-[#E343E6] bg-purple-50 border-purple-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Art and Craft":
        return "🎨";
      case "Work":
        return "💼";
      case "Personal":
        return "👤";
      case "Health":
        return "🏥";
      case "Learning":
        return "📚";
      case "Entertainment":
        return "🎮";
      case "Nature":
        return "🌿";
      case "Family":
        return "👨‍👩‍👧‍👦";
      case "Friends":
        return "👥";
      case "Meditation":
        return "🧘";
      default:
        return "📝";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 max-w-lg mx-auto border border-gray-100">
      {/* Success Icon */}
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          🎯 Your Task is Ready!
        </h2>
        <p className="text-gray-600">The wheel has chosen your next task</p>
      </div>

      {/* Task Details Card */}
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-6 mb-6 border border-gray-100 shadow-sm">
        {/* Task Title */}
        <div className="flex items-start space-x-3 mb-2 ">
          <h3 className="text-xl font-bold text-gray-900 leading-tight">
            {task.title}
          </h3>
        </div>

        {/* Task Description */}
        {task.description && (
          <div className="mb-4">
            <p className="text-gray-700 text-sm bg-white p-4 rounded-lg border border-gray-200 leading-relaxed">
              {task.description}
            </p>
          </div>
        )}

        {/* Task Meta Information */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 border border-gray-200">
            {getCategoryIcon(task.category)} {task.category}
          </span>
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
              task.status
            )}`}
          >
            ● {task.status}
          </span>
        </div>

        {/* Due Date */}
        {task.dueDate && (
          <div className="flex items-center text-sm text-gray-600 bg-amber-50 p-3 rounded-lg border border-amber-200">
            <span className="mr-1">
              <CalendarDays />
            </span>
            <span className="font-medium">Due: </span>
            <span className="ml-1 font-semibold text-amber-800">
              {formatDate(task.dueDate)}
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={onSpinAgain}
            variant="outline"
            className="w-full border-2 border-[#21D789] text-[#21D789] hover:bg-[#21D789] hover:text-white transition-all duration-200 cursor-pointer"
          >
            🎲 Spin Again
          </Button>
          <Button
            onClick={onClose}
            variant="secondary"
            className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200 cursor-pointer"
          >
            ⏰ Maybe Later
          </Button>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="text-center mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
        <p className="text-sm text-gray-600 font-medium">
          ✨ You&apos;ve got this! Take it one step at a time.
        </p>
      </div>
    </div>
  );
};

export default TaskResult;
