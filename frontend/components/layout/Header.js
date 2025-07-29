"use client";

import React from "react";
import Image from "next/image";
import { authService } from "@/lib/auth";
import Button from "@/components/ui/Button";

const Header = ({ user }) => {
  const handleLogout = () => {
    authService.logout();
  };

  return (
    <header className="bg-gradient-to-r from-green-800 to-green-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold">Tasko</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="/dashboard"
              className="hover:text-green-200 transition-colors"
            >
              Dashboard
            </a>
            <a
              href="/dashboard/tasks"
              className="hover:text-green-200 transition-colors"
            >
              All Tasks
            </a>
            <a
              href="/dashboard/spin-wheel"
              className="hover:text-green-200 transition-colors"
            >
              Spin Wheel
            </a>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {/* User Avatar/Profile Image */}
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <Image
                src="/assets/images/7.png"
                alt="User Avatar"
                width={32}
                height={32}
                className="w-full h-full rounded-full object-cover"
              />
            </div>

            {/* User Info */}
            <div className="hidden sm:block">
              <p className="text-sm font-medium">{user?.fullName || "User"}</p>
              <p className="text-xs text-green-200">{user?.email}</p>
            </div>

            {/* Logout Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-white text-white hover:bg-white hover:text-green-800"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
