"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import CustomDropdown from "@/components/ui/CustomDropDown";

const schema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: yup
    .string()
    .max(500, "Description must be less than 500 characters"),
  category: yup
    .string()
    .required("Category is required")
    .oneOf(
      [
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
      ],
      "Please select a valid category"
    ),
  status: yup
    .string()
    .required("Status is required")
    .oneOf(["Pending", "In Progress", "Done"], "Please select a valid status"),
  dueDate: yup
    .date()
    .required("Due date is required")
    .nullable()
    .typeError("Please enter a valid date"),
});

const TaskModal = ({
  isOpen,
  onClose,
  onSubmit,
  task = null,
  loading = false,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      status: "",
      dueDate: null,
    },
  });

  const categoryOptions = [
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
  const statusOptions = ["Pending", "In Progress", "Done"];

  useEffect(() => {
    if (isOpen) {
      if (task) {
        reset({
          title: task.title || "",
          description: task.description || "",
          category: task.category || "",
          status: task.status || "",
          dueDate: task.dueDate
            ? new Date(task.dueDate).toISOString().split("T")[0]
            : "",
        });
      } else {
        reset({
          title: "",
          description: "",
          category: "",
          status: "",
          dueDate: "",
        });
      }
    }
  }, [isOpen, task, reset]);

  const handleFormSubmit = (data) => {
    const formattedData = {
      ...data,
      dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : null,
    };
    onSubmit(formattedData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 p-6 shadow-xl">
        <div className="p-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {task ? "Edit Task" : "Create New Task"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-3">
            <Input
              label="Task Title"
              placeholder="Enter task title"
              required
              error={errors.title?.message}
              {...register("title")}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                rows={3}
                placeholder="Enter task description (optional)"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#21D789] focus:border-transparent text-black"
                {...register("description")}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <CustomDropdown
                  options={categoryOptions}
                  value={watch("category")}
                  onChange={(value) => setValue("category", value)}
                  placeholder="Select category"
                  defaultText="Select category"
                />
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status <span className="text-red-500">*</span>
                </label>
                <CustomDropdown
                  options={statusOptions}
                  value={watch("status")}
                  onChange={(value) => setValue("status", value)}
                  placeholder="Select status"
                  defaultText="Select status"
                />
                {errors.status && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.status.message}
                  </p>
                )}
              </div>
            </div>

            <Input
              label="Due Date"
              type="date"
              error={errors.dueDate?.message}
              {...register("dueDate")}
            />

            {/* Actions */}
            <div className="flex space-x-2 pt-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 text-sm py-2 cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                className="flex-1 text-sm py-2 cursor-pointer"
              >
                {task ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
