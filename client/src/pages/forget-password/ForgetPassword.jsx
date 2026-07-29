"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/images/textLogo.png";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { showToast } from "@/helper/showToast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, KeyRound, Mail, ArrowLeft } from "lucide-react";
import { z } from "zod";

// Zod Schemas matching your app's validation standards
const emailSchema = z.string().trim().min(1, "Email is required.").email("Invalid email format.");
const otpSchema = z.string().trim().length(6, "OTP must be exactly 6 digits.");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters.");

export default function ForgetPasswordPage() {
  const router = useRouter();

  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Reset Password
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  // Step 1: Request OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError("");

    const validation = emailSchema.safeParse(email);
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/forget-password/request-otp`,
        { email }
      );

      if (response.data.success) {
        showToast("success", response.data.message);
        setStep(2);
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to send reset code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");

    const validation = otpSchema.safeParse(otp);
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/forget-password/verify-otp`,
        { email, otp }
      );

      if (response.data.success) {
        showToast("success", response.data.message);
        setStep(3);
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid OTP code.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    const passValidation = passwordSchema.safeParse(newPassword);
    if (!passValidation.success) {
      setError(passValidation.error.errors[0].message);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/forget-password/reset`,
        { email, otp, newPassword, confirmPassword }
      );

      if (response.data.success) {
        showToast("success", response.data.message);
        router.push("/sign-in");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        
        {/* Logo Section */}
        <Link href={"/"}>
          <div className="flex justify-center items-center mb-4">
            <Image src={logo} priority className="w-56" alt="Logo" />
          </div>
        </Link>

        {/* Heading Section */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {step === 1 && "Forgot Password?"}
            {step === 2 && "Enter Verification Code"}
            {step === 3 && "Set New Password"}
          </h2>
          <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
            {step === 1 && "Enter your email to receive a password reset code"}
            {step === 2 && `We sent a 6-digit code to ${email}`}
            {step === 3 && "Your new password must be different from previous passwords"}
          </p>
        </div>

        {/* Dynamic Multi-Step Form */}
        {step === 1 && (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="name@example.com"
              />
            </div>

            {error && (
              <p className="text-sm text-destructive mt-2 font-medium text-center bg-destructive/10 py-2 rounded-md border border-destructive/20">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2"
            >
              <Mail className="h-4 w-4" />
              <span>{loading ? "Sending Code..." : "Send Reset Code"}</span>
            </Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="otp"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                6-Digit OTP Code
              </label>
              <Input
                id="otp"
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                className="text-center tracking-widest font-mono text-lg"
              />
            </div>

            {/* 🛡️ Professional Guidance Alert Box */}
            <div className="p-3.5 bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/50 rounded-xl text-xs text-amber-900 dark:text-amber-200 space-y-1">
              <p className="font-semibold flex items-center gap-1.5">
                <span>📩</span> Did you not receive the email?
              </p>
             <p className="leading-relaxed">
  Sometimes emails don't land directly in your Inbox. If you don't see it, please check your <b>Spam</b> or <b>Junk</b> folder. Our emails are 100% secure, so no need to worry!
</p>
            </div>

            {error && (
              <p className="text-sm text-destructive mt-2 font-medium text-center bg-destructive/10 py-2 rounded-md border border-destructive/20">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2"
            >
              <KeyRound className="h-4 w-4" />
              <span>{loading ? "Verifying..." : "Verify Code"}</span>
            </Button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            {/* New Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="newPassword"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                New Password
              </label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 focus:outline-none transition-colors"
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 focus:outline-none transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive mt-2 font-medium text-center bg-destructive/10 py-2 rounded-md border border-destructive/20">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2"
            >
              <span>{loading ? "Updating..." : "Update Password"}</span>
            </Button>
          </form>
        )}

        {/* Back to Sign In Link */}
        <p className="mt-6 text-center text-xs text-zinc-500 dark:text-zinc-400">
          <Link
            href={"/sign-in"}
            className="font-medium text-primary hover:underline inline-flex items-center gap-1"
          >
            <ArrowLeft className="h-3 w-3" /> Back to Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}