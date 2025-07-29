"use client";

import React from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

const NoTasks = ({ onCreateTask }) => {
  return (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        <Image
          src="/assets/images/5.png"
          alt="No tasks available"
          width={300}
          height={300}
          className="w-full h-auto max-w-xs mx-auto mb-8"
        />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No Task is Available yet
        </h3>
        <p className="text-gray-600 mb-6">Please Add your New Task</p>
        <Button onClick={onCreateTask}>Add New Task</Button>
      </div>
    </div>
  );
};

export default NoTasks;
