"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SpinningWheel from "@/components/wheel/SpinningWheel";
import TaskResult from "@/components/wheel/TaskResult";
import NoTasks from "@/components/tasks/NoTasks";
import Button from "@/components/ui/Button";
import CustomDropdown from "@/components/ui/CustomDropDown";
import { taskService } from "@/lib/tasks";
import toast from "react-hot-toast";
import { ClipboardList } from "lucide-react";

export default function SpinWheelPage() {
  const [selectedCategory, setSelectedCategory] = useState(null); // Start with no selection
  const [selectedTask, setSelectedTask] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasNoTasks, setHasNoTasks] = useState(false);
  const router = useRouter();

  const categories = [
    "All Tasks",
    "Art and Craft",
    "Work",
    "Personal",
    "Health",
    "Learning",
    "Entertainment",
    "Nature",
    "Family",
    "Friends",
    "Meditation",
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setShowResult(false);
    setSelectedTask(null);
    setHasNoTasks(false);
  };

  const handleTaskSelected = async (wheelCategory) => {
    try {
      setLoading(true);

      // Use selected category if available, otherwise use wheel category
      const categoryToUse =
        selectedCategory && selectedCategory !== "All Tasks"
          ? selectedCategory
          : wheelCategory;

      const task = await taskService.getRandomTask(
        categoryToUse === "All Tasks" ? null : categoryToUse
      );
      setSelectedTask(task);
      setShowResult(true);
      setHasNoTasks(false);
    } catch (error) {
      // Define categoryToUse again for error handling
      const categoryToUse =
        selectedCategory && selectedCategory !== "All Tasks"
          ? selectedCategory
          : wheelCategory;

      if (error.message.includes("No pending tasks found")) {
        setHasNoTasks(true);
        toast.error(`No pending tasks found in ${categoryToUse} category`);
      } else {
        toast.error(error.message || "Failed to get random task");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStartTask = async () => {
    try {
      await taskService.updateTask(selectedTask._id, { status: "In Progress" });
      toast.success("Task started! Good luck!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Failed to start task");
    }
  };

  const handleSpinAgain = () => {
    setShowResult(false);
    setSelectedTask(null);
    setHasNoTasks(false);
  };

  const handleClose = () => {
    setShowResult(false);
    setSelectedTask(null);
    setHasNoTasks(false);
  };

  const handleCreateTask = () => {
    router.push("/dashboard");
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="relative -mt-20 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl min-h-[700px]">
            {/* Header Section */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  Spin Wheel
                </h3>

                {/* Category Filter Dropdown */}
                <div className="flex items-center space-x-3">
                  <CustomDropdown
                    options={categories}
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    placeholder="Select Task Category"
                  />

                  {/* Go to Task Button - only show when task is selected */}
                  {showResult && selectedTask && (
                    <button
                      onClick={() => router.push("/dashboard")}
                      className="px-4 py-2 bg-[#21D789] text-white rounded-lg hover:bg-emerald-600 flex items-center space-x-2 cursor-pointer transition-colors"
                    >
                      <span>
                        <ClipboardList />
                      </span>
                      <span>Go To Task</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-6">
              {showResult && selectedTask ? (
                <div className="flex justify-center">
                  <TaskResult
                    task={selectedTask}
                    onStartTask={handleStartTask}
                    onSpinAgain={handleSpinAgain}
                    onClose={handleClose}
                  />
                </div>
              ) : hasNoTasks ? (
                <div className="text-center">
                  <NoTasks onCreateTask={handleCreateTask} />
                  <div className="mt-6">
                    <Button onClick={handleSpinAgain} variant="outline">
                      Try Different Category
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  {/* Left side - Spinning Wheel */}
                  <div className="flex flex-col items-center">
                    <SpinningWheel
                      onTaskSelected={handleTaskSelected}
                      categories={[
                        {
                          name: "Work",
                          color: "#3B82F6",
                          textColor: "#FFFFFF",
                        },
                        {
                          name: "Personal",
                          color: "#8B5CF6",
                          textColor: "#FFFFFF",
                        },
                        {
                          name: "Health",
                          color: "#10B981",
                          textColor: "#FFFFFF",
                        },
                        {
                          name: "Learning",
                          color: "#F59E0B",
                          textColor: "#FFFFFF",
                        },
                        {
                          name: "Entertainment",
                          color: "#EF4444",
                          textColor: "#FFFFFF",
                        },
                        {
                          name: "Nature",
                          color: "#059669",
                          textColor: "#FFFFFF",
                        },
                        {
                          name: "Family",
                          color: "#7C3AED",
                          textColor: "#FFFFFF",
                        },
                        {
                          name: "Friends",
                          color: "#DC2626",
                          textColor: "#FFFFFF",
                        },
                        {
                          name: "Art and Craft",
                          color: "#EA580C",
                          textColor: "#FFFFFF",
                        },
                        {
                          name: "Meditation",
                          color: "#0891B2",
                          textColor: "#FFFFFF",
                        },
                      ]}
                    />

                    <p className="text-center text-gray-600 mt-4">
                      Spin Wheel to pick your task
                    </p>
                  </div>

                  {/* Right side - Category Selection with CustomDropdown Style */}
                  <div className=" rounded-xl p-6">
                    {selectedCategory && (
                      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm text-green-800">
                          <span className="font-semibold">✅ Selected:</span>{" "}
                          {selectedCategory}
                        </p>
                        <p className="text-xs text-green-600 mt-1">
                          The wheel will pick a random task from this category
                          when you spin.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Back to Dashboard Button */}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
