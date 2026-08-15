'use client'

import { showToast } from "@/helper/showToast";
import { useAxios } from "@/helper/useAxios";
import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useUserStore } from "@/store/userStore";
import { RxBookmark } from "react-icons/rx";
import { RxBookmarkFilled } from "react-icons/rx";

const axiosOptions = { withCredentials: true };

const LikeCount = ({ props }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  const { user, isLoggedIn, isHydrated } = useUserStore();

  const userId = user?.user?._id || user?._id; 

  const apiUrl = useMemo(() => {
    if (!props?.blogid ) return null;

    if (isHydrated && isLoggedIn && userId) {
      return `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog-like/get-like/${props.blogid}/${userId}`;
    }
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog-like/get-like/${props.blogid}`;
  }, [isHydrated, isLoggedIn, userId, props?.blogid]); // 👈 Fixed Dependency Array

  const { data: bloglikeCount } = useAxios(apiUrl, axiosOptions, [apiUrl]);

  useEffect(() => {
    if (bloglikeCount) {
      setLikeCount(bloglikeCount.likeCount ?? 0);
      setHasLiked(!!bloglikeCount.isuserLiked);
    }
  }, [bloglikeCount]);

  const handleLike = async () => {
    if (!isLoggedIn) {
      return showToast("error", "Please login into your Account");
    }

    const currentlyLiked = hasLiked;
    setHasLiked(!currentlyLiked);
    setLikeCount((prev) => (currentlyLiked ? prev - 1 : prev + 1));

    try {
      const data = { user: userId, blogid: props.blogid , categoryid: props.categoryid };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog-like/like`,
        data,
        axiosOptions
      );

      if (response.status === 200 && response.data) {
        setLikeCount(response.data.likeCount);
      }
    } catch (error) {
      setHasLiked(currentlyLiked);
      setLikeCount((prev) => (currentlyLiked ? prev + 1 : prev - 1));
      showToast("error", "Failed to update like");
    }
  };

  return (
    <button
      onClick={handleLike}
      type="button"
      className="flex justify-between items-center gap-2"
    >
      {hasLiked ? <RxBookmarkFilled size={20} className="text-red-600" /> : <RxBookmark size={20} />}
      <span>{likeCount}</span>
    </button>
  );
};

export default LikeCount;