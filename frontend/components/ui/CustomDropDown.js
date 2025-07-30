"use client";
import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

export default function CustomDropdown({
  options,
  value,
  onChange,
  placeholder,
  multiple = false,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const isSelected = (option) => {
    if (multiple) {
      return Array.isArray(value) && value.includes(option);
    }
    return value === option;
  };

  const handleSelect = (option, e) => {
    e.stopPropagation(); // Stop event from bubbling up
    e.preventDefault(); // Prevent default behavior

    if (multiple) {
      const newValue = Array.isArray(value) ? [...value] : [];
      if (newValue.includes(option)) {
        onChange(newValue.filter((item) => item !== option));
      } else {
        onChange([...newValue, option]);
      }
    } else {
      onChange(option);
      setIsOpen(false);
    }
  };

  const displayValue = () => {
    if (multiple && Array.isArray(value) && value.length > 0) {
      return `${value.length} selected`;
    }
    return value || placeholder;
  };

  const handleButtonClick = (e) => {
    e.preventDefault(); // Prevent form submission
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={handleButtonClick}
        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center justify-between text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#21D789] focus:border-transparent min-w-[180px]"
      >
        <span className="text-sm">{displayValue()}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto text-black"
          onClick={(e) => e.preventDefault()} // Prevent form submission
        >
          {options.map((option) => (
            <div
              key={option}
              onClick={(e) => handleSelect(option, e)}
              className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center text-sm"
            >
              <div
                className={`w-4 h-4 border rounded mr-3 flex items-center justify-center ${
                  isSelected(option)
                    ? "bg-[#21D789] border-[#21D789]"
                    : "border-gray-300"
                }`}
              >
                {isSelected(option) && <Check className="w-3 h-3 text-white" />}
              </div>
              <span>{option}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
