"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Trash2, CalendarDays } from "lucide-react";

const TaskCard = ({ task, onDelete }) => {
  const router = useRouter();

  const handleCardClick = (e) => {
    if (e.target.closest(".delete-button")) {
      return;
    }
    router.push(`/dashboard/tasks/${task._id}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(task._id);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Done":
        return "text-[#21D789]";
      case "In Progress":
        return "text-[#DD9221]";
      case "Pending":
        return "text-[#E343E6]";
      default:
        return "text-gray-600";
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
    if (!dateString) return "No due date";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-200 cursor-pointer relative w-full min-h-[200px]"
    >
      {/* Delete button */}
      <button
        onClick={handleDelete}
        className="delete-button absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors p-1"
      >
        <Trash2 className="w-5 h-5" />
      </button>

      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-xl">
            {getCategoryIcon(task.category)}
          </div>
          <div className="flex-1 pr-10">
            <h3 className="font-semibold text-gray-900 text-lg truncate">
              {task.title}
            </h3>
          </div>
        </div>

        {/* Description - shifted right to align with title */}
        {task.description && (
          <div className="pl-16">
            {" "}
            {/* 12 (icon width) + 4 (space-x-4) = 16 */}
            <p className="text-gray-600 text-sm line-clamp-3">
              {task.description}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-8">
        <div className="flex items-center space-x-2 text-gray-500 text-sm">
          <span>
            <CalendarDays />
          </span>
          <span className="text-gray-700 font-bold">
            {formatDate(task.dueDate)}
          </span>
        </div>
        <span className={`text-sm font-medium ${getStatusColor(task.status)}`}>
          • {task.status}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
