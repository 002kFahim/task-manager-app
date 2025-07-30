"use client";

import React from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

const NoTasks = ({ onCreateTask }) => {
  return (
    <div className="text-center py-4">
      <div className="mb-6 flex items-center justify-center ">
        <Image
          src="/noTask/notask.png"
          alt="No tasks available"
          width={800}
          height={600}
          className="w-full h-auto"
        />
      </div>
      <h4 className="text-xl font-semibold text-gray-800 mb-2">
        No Task is Available yet, Please Add your New Task
      </h4>
    </div>
  );
};

export default NoTasks;
