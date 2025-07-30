"use client";

import React, { useState, useEffect } from "react";
import { authService } from "@/lib/auth";
import { taskService } from "@/lib/tasks";
import DashboardLayout from "@/components/layout/DashboardLayout";
import TaskCard from "@/components/tasks/TaskCard";
import TaskModal from "@/components/tasks/TaskModal";
import NoTasks from "@/components/tasks/NoTasks";
import CustomDropdown from "@/components/ui/CustomDropDown";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState(null); // No default selection
  const [statusFilter, setStatusFilter] = useState(null); // No default selection
  const user = authService.getUser();

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

  const statuses = ["All Tasks", "Pending", "In Progress", "Done"];

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const params = {};

        if (statusFilter && statusFilter !== "All Tasks") {
          params.status = statusFilter;
        }
        if (categoryFilter && categoryFilter !== "All Tasks") {
          params.category = categoryFilter;
        }

        const data = await taskService.getTasks(params);
        setTasks(data.tasks);
      } catch (error) {
        toast.error(error.message || "Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [categoryFilter, statusFilter]);

  const handleCreateTask = () => {
    setModalOpen(true);
  };

  const handleModalSubmit = async (taskData) => {
    try {
      setModalLoading(true);
      await taskService.createTask(taskData);
      toast.success("Task created successfully!");
      setModalOpen(false);
      fetchTasks();
    } catch (error) {
      toast.error(error.message || "Failed to create task");
    } finally {
      setModalLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      toast.success("Task deleted successfully!");
      fetchTasks();
    } catch (error) {
      toast.error(error.message || "Failed to delete task");
    }
  };

  // Filter tasks based on selected filters
  const filteredTasks = tasks.filter((task) => {
    if (!categoryFilter || categoryFilter === "All Tasks") {
      return true;
    }
    if (task.category !== categoryFilter) {
      return false;
    }
    if (!statusFilter || statusFilter === "All Tasks") {
      return true;
    }
    if (task.status !== statusFilter) {
      return false;
    }
    return true;
  });

  return (
    <DashboardLayout>
      <div className="relative -mt-20 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl min-h-[700px]">
            {/* Dashboard Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  All Task List
                </h3>

                <div className="flex items-center space-x-3">
                  {/* Category Filter */}
                  <CustomDropdown
                    options={categories}
                    value={categoryFilter}
                    onChange={setCategoryFilter}
                    placeholder="Select Category"
                    defaultText="Select Category"
                  />

                  {/* Status Filter */}
                  <CustomDropdown
                    options={statuses}
                    value={statusFilter}
                    onChange={setStatusFilter}
                    placeholder="Select Status"
                    defaultText="Select Status"
                  />

                  {/* Add Task Button */}
                  <button
                    onClick={handleCreateTask}
                    className="px-4 py-2 bg-[#21D789] text-white rounded-lg hover:bg-white hover:outline hover-border-[#21D789] hover:text-[#21D789] flex items-center space-x-2 cursor-pointer"
                  >
                    <span>+</span>
                    <span>Add New Task</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(100vh-12rem)]">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
                </div>
              ) : filteredTasks.length === 0 ? (
                <NoTasks onCreateTask={handleCreateTask} />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                  {filteredTasks.map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onDelete={handleDeleteTask}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <TaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        loading={modalLoading}
      />
    </DashboardLayout>
  );
}
