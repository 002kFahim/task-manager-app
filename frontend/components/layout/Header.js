"use client";

import React, { useState, useEffect, useRef } from "react";
import { authService } from "@/lib/auth";
import {
  ChevronDown,
  ChevronUp,
  Timer,
  ClipboardList,
  ShipWheel,
  CircleUser,
} from "lucide-react";
import { useRouter } from "next/navigation";

const Header = ({ user }) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    authService.logout();
  };

  const handleResetPassword = () => {
    router.push("/auth/reset-password");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center text-white">
            <div className="w-6 h-6 mr-3">
              <Timer />
            </div>
            <h1 className="text-xl font-bold">Tasko</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8 text-white">
            <a
              href="/dashboard"
              className="flex items-center space-x-2 hover:text-[#21D789] transition-colors"
            >
              <ClipboardList />
              <span>Task List</span>
            </a>
            <a
              href="/dashboard/spin-wheel"
              className="flex items-center space-x-2 hover:text-[#21D789] transition-colors"
            >
              <ShipWheel />
              <span>Spin</span>
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="text-white focus:outline-none">
              <ChevronDown className="w-6 h-6" />
            </button>
          </div>

          {/* User Menu Dropdown */}
          <div
            className="relative hidden md:flex items-center space-x-3 text-white"
            ref={dropdownRef}
          >
            <CircleUser />
            <span className="font-medium">{user?.fullName || "User"}</span>

            {/* Dropdown Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center focus:outline-none"
            >
              {menuOpen ? (
                <ChevronUp className="w-4 h-4 ml-1 transition-transform duration-200" />
              ) : (
                <ChevronDown className="w-4 h-4 ml-1 transition-transform duration-200" />
              )}
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute right-0 top-10 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-200 ${
                menuOpen
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <button
                onClick={handleResetPassword}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
              >
                Reset Password
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
