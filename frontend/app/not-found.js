"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Gradient - Same as reset password page */}
      <div className="h-48 bg-gradient-to-br from-teal-800 via-gray-950 to-teal-800"></div>

      {/* Main Content Card - Enlarged with increased height */}
      <div className="px-6 pb-6 -mt-20 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-12 max-w-6xl mx-auto min-h-[700px] flex items-center">
          <div className="max-w-2xl mx-auto text-center w-full">
            {/* 404 Illustration - Significantly larger */}
            <div className="mb-12">
              <Image
                src="/error/error.png"
                alt="404 Illustration"
                width={1200}
                height={900}
                className="w-full h-auto max-w-3xl mx-auto"
              />
            </div>

            {/* Back to Home Button */}
            <div className="space-y-6">
              <Link href="/dashboard">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full max-w-md mx-auto bg-[#21D789] hover:bg-emerald-500 cursor-pointer py-4 text-lg !text-black"
                >
                  Back To Home
                </Button>
              </Link>

              {/* Additional Link */}
              <div className="mt-6">
                <Link
                  href="/auth/login"
                  className="text-[#21D789] hover:text-emerald-500 font-medium text-base"
                >
                  Go to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
