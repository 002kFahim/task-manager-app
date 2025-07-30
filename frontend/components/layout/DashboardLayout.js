"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/auth";
import Header from "./Header";

const DashboardLayout = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    if (!authService.isAuthenticated()) {
      router.push("/auth/login");
      return;
    }

    // Get user data
    const userData = authService.getUser();
    setUser(userData);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative">
        {/* Gradient header section - limited height */}
        <div className="h-64 bg-gradient-to-br from-teal-800 via-gray-950 to-teal-800">
          <Header user={user} />

          {/* Welcome Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
            <div className="text-white">
              <p className="text-base">
                Hi {user?.fullName?.split(" ")[0] || "User"}
              </p>
              <h2 className="text-2xl font-bold">Welcome to Dashboard</h2>
            </div>
          </div>
        </div>

        <main>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
