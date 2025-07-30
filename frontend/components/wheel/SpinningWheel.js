"use client";

import React, { useState, useRef } from "react";

const SpinningWheel = ({ onTaskSelected, categories }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef(null);

  const defaultCategories = [
    { name: "Work", color: "#3B82F6", textColor: "#FFFFFF" },
    { name: "Personal", color: "#8B5CF6", textColor: "#FFFFFF" },
    { name: "Health", color: "#10B981", textColor: "#FFFFFF" },
    { name: "Learning", color: "#F59E0B", textColor: "#FFFFFF" },
    { name: "Entertainment", color: "#EF4444", textColor: "#FFFFFF" },
    { name: "Nature", color: "#059669", textColor: "#FFFFFF" },
    { name: "Family", color: "#7C3AED", textColor: "#FFFFFF" },
    { name: "Friends", color: "#DC2626", textColor: "#FFFFFF" },
    { name: "Art and Craft", color: "#EA580C", textColor: "#FFFFFF" },
    { name: "Meditation", color: "#0891B2", textColor: "#FFFFFF" },
  ];

  const wheelCategories = categories || defaultCategories;
  const segmentAngle = 360 / wheelCategories.length;

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);

    // Generate random spin (multiple full rotations + random angle)
    const spins = Math.floor(Math.random() * 5) + 5; // 5-9 full rotations
    const finalAngle = Math.random() * 360;
    const totalRotation = rotation + spins * 360 + finalAngle;

    setRotation(totalRotation);

    // Determine which segment was selected
    setTimeout(() => {
      // Calculate the final position relative to the pointer (top of wheel)
      const normalizedAngle = (360 - (totalRotation % 360)) % 360;
      const selectedIndex = Math.floor(normalizedAngle / segmentAngle);
      const selectedCategory = wheelCategories[selectedIndex];

      setIsSpinning(false);
      onTaskSelected(selectedCategory.name);
    }, 3000); // 3 second spin duration
  };

  // Generate wheel segments
  const generateSegments = () => {
    return wheelCategories.map((category, index) => {
      const startAngle = index * segmentAngle;
      const endAngle = (index + 1) * segmentAngle;
      const midAngle = (startAngle + endAngle) / 2;

      // Convert to radians for calculations
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;
      const midRad = (midAngle * Math.PI) / 180;

      const radius = 150;
      const innerRadius = 0;

      // Calculate path for the segment
      const x1 = Math.cos(startRad) * radius;
      const y1 = Math.sin(startRad) * radius;
      const x2 = Math.cos(endRad) * radius;
      const y2 = Math.sin(endRad) * radius;

      const largeArcFlag = segmentAngle > 180 ? 1 : 0;

      const pathData = [
        `M 0 0`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        `Z`,
      ].join(" ");

      // Calculate text position
      const textRadius = radius * 0.7;
      const textX = Math.cos(midRad) * textRadius;
      const textY = Math.sin(midRad) * textRadius;
      const textRotation =
        midAngle > 90 && midAngle < 270 ? midAngle + 180 : midAngle;

      return (
        <g key={index}>
          <path
            d={pathData}
            fill={category.color}
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          <text
            x={textX}
            y={textY}
            fill={category.textColor}
            fontSize="12"
            fontWeight="600"
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(${textRotation}, ${textX}, ${textY})`}
          >
            {category.name}
          </text>
        </g>
      );
    });
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Wheel Container */}
      <div className="relative">
        {/* Pointer/Arrow */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
          <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-b-[25px] border-l-transparent border-r-transparent border-b-[#21D789]"></div>
        </div>

        {/* Wheel */}
        <div
          ref={wheelRef}
          className={`transition-transform duration-[3000ms] ease-out ${
            isSpinning ? "" : ""
          }`}
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: "center center",
          }}
        >
          <svg
            width="320"
            height="320"
            viewBox="-160 -160 320 320"
            className="drop-shadow-lg"
          >
            {/* Outer ring */}
            <circle
              cx="0"
              cy="0"
              r="160"
              fill="#DC2626"
              stroke="#FFFFFF"
              strokeWidth="8"
            />

            {/* Segments */}
            <g transform="rotate(-90)">{generateSegments()}</g>

            {/* Center circle */}
            <circle
              cx="0"
              cy="0"
              r="20"
              fill="#FFFFFF"
              stroke="#E5E7EB"
              strokeWidth="2"
            />

            {/* Center dots for decoration */}
            {[...Array(8)].map((_, i) => (
              <circle
                key={i}
                cx={Math.cos((i * 45 * Math.PI) / 180) * 12}
                cy={Math.sin((i * 45 * Math.PI) / 180) * 12}
                r="2"
                fill="#9CA3AF"
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Spin Button */}
      <button
        onClick={handleSpin}
        disabled={isSpinning}
        className={`px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 flex items-center space-x-2 ${
          isSpinning
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#21D789] hover:bg-[#1DBE7A] hover:shadow-lg transform hover:scale-105"
        }`}
      >
        <svg
          className={`w-5 h-5 ${isSpinning ? "animate-spin" : ""}`}
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
        <span>{isSpinning ? "Spinning..." : "Spin"}</span>
      </button>
    </div>
  );
};

export default SpinningWheel;
