"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SpinningWheel from "@/components/wheel/SpinningWheel";
import TaskResult from "@/components/wheel/TaskResult";
import NoTasks from "@/components/tasks/NoTasks";
import Button from "@/components/ui/Button";
import { taskService } from "@/lib/tasks";
import toast from "react-hot-toast";

export default function SpinWheelPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTask, setSelectedTask] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasNoTasks, setHasNoTasks] = useState(false);
  const router = useRouter();

  const categories = [
    "All",
    "Work",
    "Personal",
    "Health",
    "Learning",
    "Entertainment",
    "Other",
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

      // Use the category from wheel if "All" is selected, otherwise use selected category
      const categoryToUse =
        selectedCategory === "All" ? wheelCategory : selectedCategory;

      const task = await taskService.getRandomTask(
        categoryToUse === "All" ? null : categoryToUse
      );
      setSelectedTask(task);
      setShowResult(true);
      setHasNoTasks(false);
    } catch (error) {
      if (error.message.includes("No pending tasks found")) {
        setHasNoTasks(true);
        toast.error(
          `No pending tasks found in ${
            selectedCategory === "All" ? wheelCategory : selectedCategory
          } category`
        );
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
      <div className="px-4 sm:px-0">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Task Spinner
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Can&apos;t decide what to work on next? Let the wheel choose for
            you! Select a category and spin the wheel to get a random task.
          </p>
        </div>

        {/* Category Selection */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Choose a Category
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-green-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex justify-center">
          {showResult && selectedTask ? (
            <TaskResult
              task={selectedTask}
              onStartTask={handleStartTask}
              onSpinAgain={handleSpinAgain}
              onClose={handleClose}
            />
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
            <div className="w-full max-w-lg">
              <SpinningWheel
                onTaskSelected={handleTaskSelected}
                categories={[
                  { name: "Work", color: "#3B82F6", textColor: "#FFFFFF" },
                  { name: "Personal", color: "#8B5CF6", textColor: "#FFFFFF" },
                  { name: "Health", color: "#10B981", textColor: "#FFFFFF" },
                  { name: "Learning", color: "#F59E0B", textColor: "#FFFFFF" },
                  {
                    name: "Entertainment",
                    color: "#EF4444",
                    textColor: "#FFFFFF",
                  },
                  { name: "Other", color: "#6B7280", textColor: "#FFFFFF" },
                ]}
              />

              {/* Selected Category Display */}
              <div className="text-center mt-6">
                <p className="text-gray-600">
                  Selected Category:{" "}
                  <span className="font-semibold text-green-600">
                    {selectedCategory}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Back to Dashboard */}
        <div className="text-center mt-12">
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            ← Back to Dashboard
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
