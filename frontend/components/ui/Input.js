"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({
  label,
  error,
  type = "text",
  className = "",
  required = false,
  showPasswordToggle = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = showPasswordToggle
    ? showPassword
      ? "text"
      : "password"
    : type;

  const inputClasses = `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#21D789] focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400 bg-white ${
    error
      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
      : isFocused
      ? "border-[#21D789]"
      : "border-gray-300 hover:border-gray-400"
  } ${showPasswordToggle ? "hide-password-toggle" : ""} ${className}`;

  const labelClasses = `block text-sm font-medium mb-2 transition-colors duration-200 ${
    error ? "text-red-700" : "text-gray-700"
  }`;

  return (
    <>
      {/* Add global styles to hide browser password toggles */}
      <style jsx global>{`
        .hide-password-toggle::-ms-reveal,
        .hide-password-toggle::-ms-clear {
          display: none;
        }
        .hide-password-toggle::-webkit-credentials-auto-fill-button,
        .hide-password-toggle::-webkit-strong-password-auto-fill-button {
          display: none !important;
        }
        input[type="password"]::-webkit-credentials-auto-fill-button {
          display: none !important;
        }
      `}</style>

      <div className="mb-4">
        {label && (
          <label className={labelClasses}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            type={inputType}
            className={inputClasses}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={showPasswordToggle ? { paddingRight: "2.5rem" } : {}}
            {...props}
          />
          {showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors duration-200"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <svg
              className="w-4 h-4 mr-1 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
      </div>
    </>
  );
};

export default Input;
