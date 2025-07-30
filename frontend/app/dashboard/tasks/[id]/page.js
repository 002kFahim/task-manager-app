"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Button from "@/components/ui/Button";
import CustomDropdown from "@/components/ui/CustomDropDown";
import { taskService } from "@/lib/tasks";
import { CalendarDays, PencilLine } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";

export default function TaskDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const taskId = params.id;

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCongratulationsModal, setShowCongratulationsModal] =
    useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const taskData = await taskService.getTask(taskId);
        setTask(taskData);
        setEditedTask(taskData);
      } catch (error) {
        toast.error(error.message || "Failed to fetch task");
        router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId, router]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleBack = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      router.push("/dashboard");
    }
  };

  const handleStatusChange = (newStatus) => {
    setEditedTask((prev) => ({ ...prev, status: newStatus }));
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      // Check if status changed to Completed
      const wasCompleted = task.status === "Done";
      const isNowCompleted = editedTask.status === "Done";

      await taskService.updateTask(taskId, editedTask);
      setTask(editedTask);
      setIsEditing(false);

      // Show congratulations modal if task was just completed
      if (!wasCompleted && isNowCompleted) {
        setShowCongratulationsModal(true);
      } else {
        toast.success("Task updated successfully!");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update task");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await taskService.deleteTask(taskId);
      toast.success("Task deleted successfully!");
      router.push("/dashboard");
    } catch (error) {
      toast.error(error.message || "Failed to delete task");
    }
    setShowDeleteModal(false);
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

  if (loading) {
    return (
      <DashboardLayout>
        <div className="relative -mt-20 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-2xl min-h-[700px] flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!task) {
    return (
      <DashboardLayout>
        <div className="relative -mt-20 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-2xl min-h-[700px] flex flex-col justify-center items-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Task Not Found
              </h2>
              <Button onClick={handleBack}>Back to Dashboard</Button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="relative -mt-20 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl min-h-[700px]">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">
                  Task Details
                </h3>
                <div className="flex space-x-3">
                  {!isEditing && (
                    <button
                      onClick={handleEdit}
                      className="cursor-pointer px-4 py-2 bg-yellow-100 text-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-white flex items-center space-x-2"
                    >
                      <span>
                        <PencilLine />
                      </span>
                      <span>Edit Task</span>
                    </button>
                  )}
                  <button
                    onClick={handleBack}
                    className="cursor-pointer px-12 py-2 bg-[#21D789] text-white rounded-lg hover:bg-green-600 flex items-center space-x-2"
                  >
                    {isEditing ? "Cancel" : "Back"}
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-16 overflow-y-auto max-h-[calc(100vh-12rem)]">
              {/* Main container with consistent spacing */}
              <div className="flex flex-col space-y-8">
                {/* Title and Description Row */}
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                    {getCategoryIcon(task.category)}
                  </div>
                  <div className="flex-1">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedTask.title}
                        onChange={(e) =>
                          setEditedTask((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        className="text-2xl font-bold text-gray-700 w-full border-b-2 border-gray-200 focus:border-green-500 outline-none pb-2"
                      />
                    ) : (
                      <h2 className="text-2xl font-bold text-gray-700">
                        {task.title}
                      </h2>
                    )}
                    {isEditing ? (
                      <textarea
                        value={editedTask.description || ""}
                        onChange={(e) =>
                          setEditedTask((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        className="mt-2 text-gray-700 w-full border border-gray-200 rounded-lg p-3 focus:border-green-500 outline-none"
                        rows="3"
                        placeholder="Task description..."
                      />
                    ) : (
                      <p className="mt-2 text-gray-700">{task.description}</p>
                    )}
                  </div>
                </div>

                {/* Category, Date and Status - Vertical Layout */}
                <div className="pl-20 space-y-4">
                  {" "}
                  {/* pl-20 matches icon width + spacing */}
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    {isEditing ? (
                      <div className="w-48">
                        <CustomDropdown
                          options={[
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
                          ]}
                          value={editedTask.category}
                          onChange={(value) =>
                            setEditedTask((prev) => ({
                              ...prev,
                              category: value,
                            }))
                          }
                          placeholder="Select Category"
                        />
                      </div>
                    ) : (
                      <span className="text-gray-700">{task.category}</span>
                    )}
                  </div>
                  {/* Date and Status in one row */}
                  <div className="flex items-center space-x-6 mb-8 flex-1">
                    {/* End Date */}
                    <div className="flex items-center space-x-2 text-gray-700 font-bold">
                      <span>
                        <CalendarDays />
                      </span>
                      {isEditing ? (
                        <input
                          type="date"
                          value={
                            editedTask.dueDate
                              ? new Date(editedTask.dueDate)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            setEditedTask((prev) => ({
                              ...prev,
                              dueDate: e.target.value,
                            }))
                          }
                          className="border border-gray-200 rounded-lg px-3 py-2 focus:border-green-500 outline-none"
                        />
                      ) : (
                        <span>
                          {task.dueDate
                            ? new Date(task.dueDate).toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )
                            : "No due date"}
                        </span>
                      )}
                    </div>

                    {/* Divider */}
                    <div className="w-px h-6 bg-gray-300"></div>

                    {/* Status */}
                    <div className="flex items-center">
                      {isEditing ? (
                        <div className="w-40">
                          <CustomDropdown
                            options={["Pending", "In Progress", "Done"]}
                            value={editedTask.status}
                            onChange={(value) => handleStatusChange(value)}
                            placeholder="Select Status"
                          />
                        </div>
                      ) : (
                        <span
                          className={`font-medium text-lg ${getStatusColor(
                            task.status
                          )}`}
                        >
                          ● {task.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Right aligned */}
                <div className="flex justify-end gap-3 pt-8 pl-20">
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="px-6 py-3 bg-red-100 text-red-600 border border-red-200 rounded-lg hover:bg-red-300 transition-colors cursor-pointer"
                  >
                    Delete Task
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!isEditing || submitting}
                    className="px-6 py-3 bg-[#21D789] text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    {submitting ? "Saving..." : "Submit"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 rounded-lg p-8 max-w-md w-full border border-gray-200/50 shadow-xl">
            <div className="text-center">
              {/* Illustration placeholder */}
              <div className="mb-6 flex items-center justify-center ">
                <Image
                  src="/delete/delete.png"
                  alt="Delete Illustration"
                  width={500}
                  height={300}
                />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Are you Sure!!
              </h3>
              <p className="text-gray-600 mb-8">
                Do you want to delete this Task on this app?
              </p>

              <div className="flex space-x-4">
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2 bg-[#21D789]/90 text-white rounded-lg hover:bg-emerald-500 transition-colors cursor-pointer"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 bg-red-100/90 text-red-600 border border-red-200 rounded-lg hover:bg-red-300 transition-colors cursor-pointer"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Congratulations Modal */}
      {showCongratulationsModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 rounded-lg p-8 max-w-md w-full relative border border-gray-200/50 shadow-xl">
            <div className="text-center">
              {/* Close button */}
              <button
                onClick={() => setShowCongratulationsModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              >
                ✕
              </button>

              {/* Celebration elements */}
              <div className="mb-6 flex items-center justify-center ">
                <Image
                  src="/congrats/congrats.png"
                  alt="Congrats Illustration"
                  width={500}
                  height={300}
                />
              </div>

              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                Successfully Completed the Task!
              </h4>
              <p className="text-gray-600 mb-8">
                Congratulations! you have successfully completed the task and
                you got 20 points.
              </p>

              <button
                onClick={() => setShowCongratulationsModal(false)}
                className="w-full px-4 py-2 bg-[#21D789]/90 text-white rounded-lg hover:bg-[#21D789] transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
