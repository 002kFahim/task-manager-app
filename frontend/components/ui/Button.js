import React from "react";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
  ...props
}) => {
  const baseClasses =
    "font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-[#21D789] hover:bg-emerald-600 text-white focus:ring-emerald-500 shadow-sm hover:shadow-md",
    secondary:
      "bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-500 border border-gray-300",
    outline:
      "border-2 border-[#21D789] text-[#21D789] hover:bg-[#21D789] hover:text-white focus:ring-[#21D789] bg-white",
    danger:
      "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500 shadow-sm hover:shadow-md",
    ghost: "text-emerald-600 hover:bg-emerald-50 focus:ring-emerald-500",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-4 text-lg",
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={classes}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
