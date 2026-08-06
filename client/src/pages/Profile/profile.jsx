'use client'
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import userIcon from "@/assets/images/placeHolder.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IoCameraOutline } from "react-icons/io5";
import Dropzone from "react-dropzone";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import axios from "axios";
import { showToast } from "@/helper/showToast";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { RxHome } from "react-icons/rx";
import Link from "next/link";
import { User } from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long."),
  bio: z.string().min(3, "Bio must be at least 3 characters long."),
  email: z
    .string()
    .trim()
    .min(1, "Email address is required.")
    .email("Invalid email format. Please use a valid email."),
  password: z.string().optional().or(z.literal("")), 
});

const axiosOptions = { withCredentials: true };

const Profile = () => {
  const { user, setUser } = useUserStore();
  const navigate = useRouter();
  const [filePreview, setfilePreview] = useState();
  const [file, setfile] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Store se nested ya direct user structure handle kar rahe hain
  const currentUser = user?.user || user;
  const userId = currentUser?._id;

  const {
    register,
    handleSubmit,
    reset, 
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      bio: currentUser?.bio || "",
      password: "",
    }
  });

  // Page Load hotay hi store se form fields populate hongi
  useEffect(() => {
    if (currentUser) {
      reset({
        name: currentUser.name || "",
        email: currentUser.email || "",
        bio: currentUser.bio || "",
        password: "", 
      });
      if (currentUser.avatar) {
        setfilePreview(currentUser.avatar);
      }
    }
  }, [currentUser, reset]);

  const handleFileSelection = async (files) => {
    const selectedFile = files[0];
    if (!selectedFile) return;
    
    const preview = URL.createObjectURL(selectedFile);
    setfile(selectedFile);
    setfilePreview(preview);
  };

  const onSubmit = async (data) => {
    if (!userId) return showToast("error", "User session not found.");
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      if (file) {
        formData.append("file", file); 
      }
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("bio", data.bio);
      
      if (data.password) {
        formData.append("password", data.password);
      }

      // Save Changes click hone par backend update hit hoga
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/update-user/${userId}`,
        formData,
        axiosOptions
      );
      
      if (response.status === 200 || response.data?.success) {
        const responseData = response.data;
        
        // Update Zustand Store with fresh data
        setUser(responseData); 
        
        showToast("success", responseData.message || "Profile updated successfully!");
      }
    } catch (error) {
      console.log("Error updating profile:", error);
      showToast(
        "error",
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto my-10 shadow-md">
      <Link href={'/'}>
        <div className="px-5 py-2 flex w-34 items-center gap-2 border rounded-full ml-5 hover:bg-red-500 hover:text-white transition-all">
          <RxHome />
          <h3>Back Home</h3>
        </div>
      </Link>
      
      <CardContent className="p-6">
        {/* Avatar Upload Section */}
        <div className="flex justify-center items-center mb-6">
          <Dropzone onDrop={handleFileSelection} multiple={false}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="flex flex-col justify-center items-center">
                <input {...getInputProps()} />
                <Avatar className="w-28 h-28 relative group cursor-pointer border border-zinc-200 dark:border-zinc-800">
                  <AvatarImage
                    src={filePreview || currentUser?.avatar || ""}
                    alt={currentUser?.name || "User Avatar"}
                    className="object-cover"
                  />

                  <AvatarFallback className="bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                    {typeof userIcon === "string" ? (
                      <img src={userIcon} alt="User Icon" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-12 h-12" />
                    )}
                  </AvatarFallback>

                  <div className="absolute inset-0 rounded-full justify-center items-center bg-black/40 group-hover:flex hidden transition-all duration-200">
                    <IoCameraOutline className="size-8 text-white" />
                  </div>
                </Avatar>
              </div>
            )}
          </Dropzone>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              UserName
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Enter Your Name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-red-500 font-medium">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              disabled
              placeholder="name@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="bio" className="block mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Bio
            </label>
            <Textarea
              id="bio"
              placeholder="Enter Your Bio"
              {...register("bio")}
            />
            {errors.bio && (
              <p className="text-xs text-red-500 font-medium">{errors.bio.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Update Password
            </label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs text-red-500 font-medium">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving Changes..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Profile;