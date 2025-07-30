"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { authService } from "@/lib/auth";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const schema = yup.object({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(2, "Name must be at least 2 characters"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { confirmPassword, ...userData } = data;
      await authService.register(userData);
      toast.success("Account created successfully!");
      router.push("/dashboard");
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
        <div className="relative z-10 flex items-center justify-center p-12 w-full">
          <div className="max-w-lg text-center">
            <Image
              src="/signup/ToDo.png"
              alt="Signup Illustration"
              width={450}
              height={350}
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>
        </div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-blue-500/10 rounded-full blur-lg"></div>
      </div>

      {/* Right side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Sign Up</h1>
            <p className="text-gray-500 text-lg">
              To Create Account, Please Fill the Form Below
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name Input */}
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              required
              error={errors.fullName?.message}
              {...register("fullName")}
            />

            {/* Email Input */}
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email address"
              required
              error={errors.email?.message}
              {...register("email")}
            />

            {/* Password Input */}
            <Input
              label="Password"
              type="password"
              placeholder="******************"
              required
              showPasswordToggle={true}
              error={errors.password?.message}
              {...register("password")}
            />

            {/* Confirm Password Input */}
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Retype password"
              required
              showPasswordToggle={true}
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            {/* Sign Up Button */}
            <Button
              type="submit"
              loading={loading}
              variant="primary"
              className="w-full mt-6"
            >
              Sign Up
            </Button>

            {/* Divider */}
            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Or</span>
              </div>
            </div>

            {/* Login link */}
            <div className="text-center mt-4">
              <span className="text-gray-600">Already have an account? </span>
              <Link
                href="/auth/login"
                className="text-emerald-600 hover:text-emerald-700 font-semibold"
              >
                Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
