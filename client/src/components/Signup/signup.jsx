'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PiUserPlus } from "react-icons/pi";
import { z } from "zod";
import logo from "@/assets/images/textLogo.png"
import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import axios from "axios";
import { showToast } from "@/helper/showToast";
import { Eye, EyeOff, ShieldCheck, RefreshCw } from "lucide-react";
import GoogleLogin from "../common/GoogleLogin";

export const signupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Full name is required.")
      .min(3, "Name must be at least 3 characters long.")
      .refine((val) => !/[<>]/.test(val), {
        message: "HTML tags are not allowed in name.",
      }),
    email: z
      .string()
      .trim()
      .min(1, "Email address is required.")
      .email("Invalid email format. Please use a valid email.")
      .refine((val) => !/[<>]/.test(val), {
        message: "HTML tags are not allowed in email.",
      }),
    password: z
      .string()
      .min(1, "Password is required.")
      .min(6, "Password must be at least 6 characters long."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const { setUser } = useUserStore();
  const navigate = useRouter();
  
  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // OTP Verification States
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otp, setOtp] = useState("");
  const [isResending, setIsResending] = useState(false);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 1. Step 1: Initial Signup Request (Sends OTP to Email)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const submissionData = { name, email, password, confirmPassword };
    const result = await signupSchema.safeParse(submissionData);

    if (!result.success) {
      const errorArray = JSON.parse(result.error.message);
      setError(errorArray[0].message);
      return;
    }

    setIsLoading(true);

    try {
      const { confirmPassword: _, ...backendData } = result.data;

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
        backendData,
        { withCredentials: true }
      );

      if (response.data.success) {
        showToast("success", response.data.message || "OTP sent to your email!");
        setShowOtpScreen(true); // Switch UI to OTP view
      }
    } catch (apiError) {
      console.error("API Error:", apiError);
      const errorMsg = apiError.response?.data?.message || "Something went wrong";
      setError(errorMsg);
      showToast("error", errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Step 2: Verify OTP & Log In
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp || otp.trim().length !== 6) {
      setError("Please enter a valid 6-digit OTP code.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );

      if (response.data.success) {
        const data = response.data;
        showToast("success", data.message || "Account verified successfully!");
      
        
        
        // Update user state & redirect home
        if (data.user) setUser(data.user);
        navigate.push('/');

        // Clear Form
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setOtp("");
      }
    } catch (apiError) {
      console.error("OTP Verification Error:", apiError);
      const errorMsg = apiError.response?.data?.message || "Invalid or expired OTP.";
      setError(errorMsg);
      showToast("error", errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Step 3: Resend OTP
  const handleResendOtp = async () => {
    setError("");
    setIsResending(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/resend-otp`,
        { email }
      );

      if (response.data.success) {
        showToast("success", response.data.message || "A new OTP has been sent!");
      }
    } catch (apiError) {
      console.error("Resend OTP Error:", apiError);
      const errorMsg = apiError.response?.data?.message || "Failed to resend OTP.";
      setError(errorMsg);
      showToast("error", errorMsg);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-zinc-950">
        <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <Link href={'/'}>
            <div className="flex justify-center items-center mb-4">
              <Image src={logo} priority className="w-56" alt="Logo" />
            </div>
          </Link>

          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {showOtpScreen ? "Verify Your Email" : "Create an Account"}
            </h2>
            <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
              {showOtpScreen
                ? `Enter the 6-digit verification code sent to ${email}`
                : "Enter your details to create a new account"}
            </p>
          </div>

          {!showOtpScreen && (
            <>
              <div>
                <GoogleLogin/>
              </div>
              <div className="w-full flex justify-center items-center border my-5 relative"> 
                <span className="absolute bg-white dark:bg-zinc-900 px-2 text-xs text-zinc-400">Or</span>
              </div>
            </>
          )}

          {!showOtpScreen ? (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Full Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="techfoAnalyzer"
                  disabled={isLoading}
                />
              </div>

              {/* Email Address */}
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
                  placeholder="techfoanalyzer@example.com"
                  disabled={isLoading}
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Password
                </label>
                
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    disabled={isLoading}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 focus:outline-none transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>

              {error && (
                <p className="text-sm text-destructive mt-2 font-medium text-center bg-destructive/10 py-2 rounded-md border border-destructive/20">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                className="w-full mt-2 flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                <PiUserPlus className="text-lg" />
                <span>{isLoading ? "Signing Up..." : "Sign Up"}</span>
              </Button>
            </form>
          ) : (
            /* --- OTP VERIFICATION FORM --- */
            <form onSubmit={handleVerifyOtp} className="space-y-4" noValidate>
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
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} // Only allow digits
                  placeholder="123456"
                  disabled={isLoading}
                  className="text-center text-xl tracking-widest font-mono"
                />
              </div>

              {error && (
                <p className="text-sm text-destructive mt-2 font-medium text-center bg-destructive/10 py-2 rounded-md border border-destructive/20">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                className="w-full mt-2 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-400 text-white"
                disabled={isLoading || otp.length !== 6}
              >
                <ShieldCheck className="text-lg" />
                <span>{isLoading ? "Verifying..." : "Verify & Complete"}</span>
              </Button>

               <div className="p-3.5 bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/50 rounded-xl text-xs text-amber-900 dark:text-amber-200 space-y-1">
              <p className="font-semibold flex items-center gap-1.5">
                <span>📩</span> Did you not receive the OTP Email?
              </p>
             <p className="leading-relaxed">
  Sometimes emails don't land directly in your Inbox. If you don't see it, please check your <b>Spam</b> or <b>Junk</b> folder. Our emails are 100% secure, so no need to worry!
</p>
            </div>
{/* -------------------------------------------------------- */}
{/* <div className="mt-4 p-4 bg-amber-50/90 border border-amber-200 rounded-xl text-xs text-amber-900 shadow-sm">
  <div className="flex items-center gap-2 font-semibold text-amber-950 mb-2">
    <span>🛡️</span>
    <span>Can&apos;t find your OTP? Don&apos;t worry, you are completely safe!</span>
  </div>
  
  <ul className="list-disc list-inside space-y-1.5 text-amber-800 pl-0.5">
    <li>
      Please check your <strong>Spam, Junk, or Promotions</strong> folder.
    </li>
    <li>
      <strong>Why in Spam?</strong> Automated email filters sometimes route security emails there. <strong>Rest assured, our email is 100% safe, secure, and spam-free.</strong>
    </li>
    <li>
      If found in Spam, simply click <strong>&quot;Not Spam&quot;</strong> — this helps future OTPs land directly in your Primary Inbox.
    </li>
    <li>
      OTP emails usually arrive in seconds, but network routing may take up to <strong>1–2 minutes</strong>.
    </li>
  </ul>
</div> */}
{/* ----------------------------------------------------------------- */}



              <div className="flex items-center justify-between mt-4 text-xs">
                <button
                  type="button"
                  onClick={() => setShowOtpScreen(false)}
                  className="text-zinc-500 hover:underline"
                >
                  ← Edit Details
                </button>

                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isResending || isLoading}
                  className="flex items-center gap-1 font-medium text-primary hover:underline disabled:opacity-50"
                >
                  <RefreshCw className={`h-3 w-3 ${isResending ? "animate-spin" : ""}`} />
                  <span>{isResending ? "Sending..." : "Resend OTP"}</span>
                </button>
              </div>
            </form>
          )}

          <p className="mt-6 text-center text-xs text-zinc-500 dark:text-zinc-400">
            Already have an account?{" "}
            <Link
              href={'/sign-in'}
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;