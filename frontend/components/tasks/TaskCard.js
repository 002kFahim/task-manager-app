"use client";

import React from "react";
import Button from "@/components/ui/Button";

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
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

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Pending":
        return "bg-gray-100 text-gray-800 border-gray-200";
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
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className={`w-3 h-3 rounded-full ${getCategoryColor(
              task.category
            )}`}
          ></div>
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {task.title}
          </h3>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="text-gray-400 hover:text-blue-600 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="text-gray-400 hover:text-red-600 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(
            task.priority
          )}`}
        >
          {task.priority}
        </span>
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
            task.status
          )}`}
        >
          {task.status}
        </span>
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 border border-gray-200">
          {task.category}
        </span>
      </div>

      {/* Due Date */}
      {task.dueDate && (
        <div className="text-sm text-gray-500 mb-4">
          <span className="font-medium">Due: </span>
          {formatDate(task.dueDate)}
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-2">
        {task.status !== "Completed" && (
          <Button
            size="sm"
            onClick={() => onStatusChange(task._id, "Completed")}
            className="flex-1"
          >
            Mark Complete
          </Button>
        )}
        {task.status === "Pending" && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onStatusChange(task._id, "In Progress")}
            className="flex-1"
          >
            Start Task
          </Button>
        )}
        {task.status === "Completed" && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onStatusChange(task._id, "Pending")}
            className="flex-1"
          >
            Reopen
          </Button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
