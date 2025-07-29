"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          {/* Error Illustration */}
          <div className="mb-8">
            <Image
              src="/assets/images/5.png"
              alt="404 Error"
              width={300}
              height={300}
              className="w-full h-auto max-w-xs mx-auto"
            />
          </div>

          {/* Error Content */}
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-gray-900">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700">
              Page Not Found
            </h2>
            <p className="text-gray-600">
              Oops! The page you&apos;re looking for doesn&apos;t exist. It
              might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 space-y-4">
            <Link href="/dashboard">
              <Button className="w-full">Back to Home</Button>
            </Link>

            <Link href="/auth/login">
              <Button variant="outline" className="w-full">
                Go to Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
