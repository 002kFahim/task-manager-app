"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Timer } from "lucide-react";
import toast from "react-hot-toast";
import { resetPasswordService } from "@/lib/resetPassword";

// Validation schema
const schema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your password"),
});

export default function ResetPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      // Simulate API call
      await resetPasswordService.resetPassword(
        data.email,
        data.newPassword,
        data.confirmPassword
      );
      toast.success(
        "Password reset successfully! Please login with your new password."
      );
      reset();
      // Redirect to login page after successful reset
      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
    } catch (error) {
      toast.error(error.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Gradient - Increased height */}
      <div className="h-48 bg-gradient-to-br from-teal-800 via-gray-950 to-teal-800"></div>

      {/* Main Content Card - Adjusted positioning */}
      <div className="px-6 pb-6 -mt-20 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-5xl mx-auto">
          <div className="max-w-md mx-auto">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#21D789] rounded-2xl flex items-center justify-center">
                <Timer className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-xl font-bold text-gray-900 mb-2">
                Reset your Password
              </h1>
              <p className="text-gray-500 text-sm">
                Strong passwords include numbers, letters, and punctuation
                marks.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email Address */}
              <Input
                label="Email Address"
                type="email"
                placeholder="m32220@gmail.com"
                required
                error={errors.email?.message}
                {...register("email")}
              />

              {/* Enter New Password */}
              <Input
                label="Enter New Password"
                type="password"
                placeholder="******************"
                required
                showPasswordToggle={true}
                error={errors.newPassword?.message}
                {...register("newPassword")}
              />

              {/* Confirm Password */}
              <Input
                label="Confirm Password"
                type="password"
                placeholder="Retype password"
                required
                showPasswordToggle={true}
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />

              {/* Reset Password Button */}
              <Button
                type="submit"
                variant="primary"
                size="md"
                loading={loading}
                className="w-full cursor-pointer"
              >
                Reset Password
              </Button>
            </form>

            {/* Back to Login Link */}
            <div className="mt-6 text-center">
              <Link
                href="/auth/login"
                className="text-[#21D789] hover:text-emerald-500 font-medium text-sm"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
