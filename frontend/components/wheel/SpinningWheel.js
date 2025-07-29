"use client";

import React, { useState, useRef } from "react";
import Button from "@/components/ui/Button";

const SpinningWheel = ({ onTaskSelected, categories = [] }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef(null);

  // Default categories with colors matching the Figma design
  const wheelCategories =
    categories.length > 0
      ? categories
      : [
          { name: "Work", color: "#3B82F6", textColor: "#FFFFFF" },
          { name: "Personal", color: "#8B5CF6", textColor: "#FFFFFF" },
          { name: "Health", color: "#10B981", textColor: "#FFFFFF" },
          { name: "Learning", color: "#F59E0B", textColor: "#FFFFFF" },
          { name: "Entertainment", color: "#EF4444", textColor: "#FFFFFF" },
          { name: "Other", color: "#6B7280", textColor: "#FFFFFF" },
        ];

  const segmentAngle = 360 / wheelCategories.length;

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);

    // Generate random rotation (multiple full rotations + random position)
    const minSpins = 5;
    const maxSpins = 8;
    const spins = Math.random() * (maxSpins - minSpins) + minSpins;
    const finalRotation = rotation + spins * 360 + Math.random() * 360;

    setRotation(finalRotation);

    // Calculate which segment was selected
    setTimeout(() => {
      const normalizedRotation = (360 - (finalRotation % 360)) % 360;
      const selectedIndex = Math.floor(normalizedRotation / segmentAngle);
      const selectedCategory = wheelCategories[selectedIndex];

      setIsSpinning(false);
      onTaskSelected(selectedCategory.name);
    }, 3000); // 3 seconds spin duration
  };

  const createSegmentPath = (index) => {
    const startAngle = (index * segmentAngle - 90) * (Math.PI / 180);
    const endAngle = ((index + 1) * segmentAngle - 90) * (Math.PI / 180);
    const radius = 120;
    const centerX = 150;
    const centerY = 150;

    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);

    const largeArcFlag = segmentAngle > 180 ? 1 : 0;

    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  const getTextPosition = (index) => {
    const angle =
      (index * segmentAngle + segmentAngle / 2 - 90) * (Math.PI / 180);
    const radius = 80;
    const centerX = 150;
    const centerY = 150;

    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Spinning Wheel */}
      <div className="relative">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-500"></div>
        </div>

        {/* Wheel Container */}
        <div className="relative w-80 h-80 rounded-full shadow-2xl overflow-hidden">
          <svg
            ref={wheelRef}
            width="300"
            height="300"
            viewBox="0 0 300 300"
            className="w-full h-full transition-transform duration-[3000ms] ease-out"
            style={{
              transform: `rotate(${rotation}deg)`,
              transformOrigin: "150px 150px",
            }}
          >
            {wheelCategories.map((category, index) => {
              const textPos = getTextPosition(index);
              return (
                <g key={index}>
                  {/* Segment */}
                  <path
                    d={createSegmentPath(index)}
                    fill={category.color}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />

                  {/* Text */}
                  <text
                    x={textPos.x}
                    y={textPos.y}
                    fill={category.textColor}
                    fontSize="14"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${
                      index * segmentAngle + segmentAngle / 2
                    }, ${textPos.x}, ${textPos.y})`}
                  >
                    {category.name}
                  </text>
                </g>
              );
            })}

            {/* Center Circle */}
            <circle
              cx="150"
              cy="150"
              r="20"
              fill="#FFFFFF"
              stroke="#E5E7EB"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Center Button */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className="w-16 h-16 bg-white rounded-full shadow-lg border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className={`w-8 h-8 text-gray-600 ${
                isSpinning ? "animate-spin" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Spin Button */}
      <Button
        onClick={spinWheel}
        loading={isSpinning}
        disabled={isSpinning}
        size="lg"
        className="px-8 py-3 text-lg font-semibold"
      >
        {isSpinning ? "Spinning..." : "Spin the Wheel!"}
      </Button>

      {/* Instructions */}
      <div className="text-center max-w-md">
        <p className="text-gray-600">
          Spin the wheel to get a random task from your selected category. The
          wheel will help you decide what to work on next!
        </p>
      </div>
    </div>
  );
};

export default SpinningWheel;
