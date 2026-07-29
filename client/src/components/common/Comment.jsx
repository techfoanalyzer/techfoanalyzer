'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaComments } from "react-icons/fa";
import z from "zod";
import { Button } from "@/components/ui/button";
import { showToast } from "@/helper/showToast";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { useUserStore } from "@/store/userStore";
import { useState } from "react";
import CommentList from "./CommentList";

const slugFormSchema = z.object({
  comment: z
    .string()
    .trim()
    .min(3, { message: "Comment must be at least 3 characters long." })
    .max(500, { message: "Comments can be a maximum of 500 characters." }),
});

const Comment = ({ props }) => {
  const { user, isLoggedIn, isHydrated } = useUserStore();
  const [callComment, setcallComment] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch, // Textarea state sync rakhne ke liye
  } = useForm({
    resolver: zodResolver(slugFormSchema),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async (data) => {
    if (!isHydrated) return;

    if (!isLoggedIn || !user?.user?._id) {
      showToast("error", "Please Login to Your Account");
      return;
    }

    try {
      const newData = { 
        ...data, 
        blogid: props?.blogid, 
        user: user.user._id 
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/comment/add`,
        newData,
        { withCredentials: true }
      );

      if (response.status === 200 || response.status === 201) {
        const resData = response.data;
        showToast("success", resData.message || "Comment added successfully");
        
        // Pass fresh state reference
        setcallComment(resData.comment || { ...newData, createdAt: new Date() });

        // Clean Reset (Watch value sync hone ki waja se DOM aur React state dono empty hongay)
        reset({ comment: "" });
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      showToast(
        "error",
        error?.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div>
      <h4 className="flex items-center gap-2 text-2xl mb-5 font-bold">
        <FaComments className="text-red-600" /> Comments
      </h4>
      
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1">
            <Textarea
              placeholder="Type your Comment Here..."
              className="resize-none pt-5 border border-gray-300 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-600"
              {...register("comment")}
              value={watch("comment") || ""}
            />
            {errors.comment && (
              <p className="text-xs text-destructive font-medium mt-1">
                {errors.comment.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 font-semibold cursor-pointer"
          >
            {isSubmitting ? "Submitting..." : "Submit Data"}
          </Button>
        </form>
      </div>

      <div className="border-t mt-5 pt-5">
        <CommentList
          className="mt-5"
          props={{ blogid: props?.blogid, callComment }}
        />
      </div>
    </div>
  );
};

export default Comment;