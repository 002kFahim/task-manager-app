"use client";

import React from "react";
import Button from "@/components/ui/Button";

const TaskResult = ({ task, onStartTask, onSpinAgain, onClose }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      Work: "bg-blue-500",
      Personal: "bg-purple-500",
      Health: "bg-green-500",
      Learning: "bg-orange-500",
      Entertainment: "bg-pink-500",
      Other: "bg-gray-500",
    };
    return colors[category] || "bg-gray-500";
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
      {/* Success Icon */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
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
          Your Task is Ready!
        </h2>
        <p className="text-gray-600">The wheel has chosen your next task</p>
      </div>

      {/* Task Details */}
      <div className="space-y-4 mb-6">
        {/* Task Title */}
        <div className="flex items-center space-x-3">
          <div
            className={`w-3 h-3 rounded-full ${getCategoryColor(
              task.category
            )}`}
          ></div>
          <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
        </div>

        {/* Task Description */}
        {task.description && (
          <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">
            {task.description}
          </p>
        )}

        {/* Task Meta Information */}
        <div className="flex flex-wrap gap-2">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(
              task.priority
            )}`}
          >
            {task.priority} Priority
          </span>
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 border border-gray-200">
            {task.category}
          </span>
        </div>

        {/* Due Date */}
        {task.dueDate && (
          <div className="text-sm text-gray-500">
            <span className="font-medium">Due: </span>
            {formatDate(task.dueDate)}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button onClick={onStartTask} className="w-full" size="lg">
          Start This Task
        </Button>

        <div className="grid grid-cols-2 gap-3">
          <Button onClick={onSpinAgain} variant="outline" className="w-full">
            Spin Again
          </Button>
          <Button onClick={onClose} variant="secondary" className="w-full">
            Maybe Later
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskResult;
