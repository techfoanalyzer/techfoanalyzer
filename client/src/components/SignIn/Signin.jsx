"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PiSignIn } from "react-icons/pi";
import { z } from "zod";
import logo from "@/assets/images/textLogo.png";
import Link from "next/link";
import Image from "next/image";
import GoogleLogin from "../common/GoogleLogin";
import { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { showToast } from "@/helper/showToast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export const loginSchema = z.object({
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
    .refine((val) => !/[<>]/.test(val), {
      message: "HTML tags are not allowed in password.",
    }),
});

const SignIn = () => {
  const { setUser } = useUserStore();
  const navigate = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [showPassword, setShowPassword] = useState(false);

 const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = { email, password };
    const result = loginSchema.safeParse(submissionData);

    if (!result.success) {
      const errorArray = JSON.parse(result.error.message);
      setErrors(errorArray[0].message);
      return;
    }

    setErrors("");
    try {
      const data = result.data;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
        data,
        { withCredentials: true },
      );

      if (response.data.success) {
        const data = response.data;
        navigate.push("/");
        setUser(data);
        showToast("success", data.message);
      }
    } catch (error) {
      const errorData = error?.response?.data;


      if (errorData?.isVerified === false) {
        showToast("error", errorData?.message || "Please verify your email first.");
        
        navigate.push(`/sign-up`);
      } else {
        showToast(
          "error",
          errorData?.message || "Something went Wrong",
        );
      }
    }

    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
        <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <Link href={"/"}>
            <div className="flex justify-center items-center mb-4 ">
              <Image src={logo} priority className="w-56" alt="" />
            </div>
          </Link>
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Welcome Back
            </h2>
            <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
              Sign in your account
            </p>
          </div>

          <div>
            <GoogleLogin />
          </div>
          <div className="w-full flex justify-center items-center border my-5">
            <span className="absolute bg-white ">Or</span>
          </div>


          <form onSubmit={handleSubmit} className="space-y-4">
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
              {/* {errors.email && (
                <p className="text-xs text-destructive mt-1 font-medium">
                  {errors.email}
                </p>
              )} */}
            </div>

            {/* Password Input */}
           <div className="space-y-1.5">
  <div className="flex items-center justify-between">
    <label
      htmlFor="password"
      className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
    >
      Password
    </label>
    <a href="/forget-password" className="text-xs text-primary hover:underline">
      Forgot password?
    </a>
  </div>

  <div className="relative">
    <Input
      id="password"
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      autoComplete="current-password"
      placeholder="••••••••"
      className="pr-10"
    />
    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 focus:outline-none transition-colors"
    >
      {showPassword ? (
        <EyeOff className="h-4 w-4" />
      ) : (
        <Eye className="h-4 w-4" />
      )}
    </button>
  </div>

  {/* {errors.password && (
    <p className="text-xs text-destructive mt-1 font-medium">
      {errors.password}
    </p>
  )} */}
</div>

            {errors && (
              <p className="text-sm text-destructive mt-2 font-medium text-center bg-destructive/10 py-2 rounded-md border border-destructive/20">
                {errors}
              </p>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full mt-2 flex items-center justify-center gap-2"
            >
              <PiSignIn className="text-lg" />
              <span>Sign In</span>
            </Button>
          </form>

          {/* Footer Section */}
          <p className="mt-6 text-center text-xs text-zinc-500 dark:text-zinc-400">
            Don't have an account?{" "}
            <Link
              href={"/sign-up"}
              className="font-medium text-primary hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
