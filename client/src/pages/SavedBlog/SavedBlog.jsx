"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAxios } from "@/helper/useAxios";
import { Bookmark, Books, Layers } from "lucide-react";
import SavedBlogCard from "@/components/common/SavedBlogCard";


const axiosOptions = { withCredentials: true };

const SavedBlog = () => {
  const [visibleCount, setVisibleCount] = useState(10);
    const [mounted, setMounted] = useState(false);

  const {
    data: savedData,
    loading,
    error,
  } = useAxios(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog-like/get-save`,
    axiosOptions,
  ); 

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      setVisibleCount(50);
    }
  }, []);

  const blogs = savedData?.data || [];

  return (
    <div className="mb-10 mt-7 px-3 md:px-8">
  <style>{`
    @keyframes paperFlip {
      0%, 100% {
        transform: rotateY(0deg) translateZ(0px);
      }
      50% {
        transform: rotateY(-35deg) translateZ(15px) scale(0.98);
        box-shadow: -15px 15px 25px rgba(220, 38, 38, 0.15);
      }
    }
  `}</style>

  {/* Header Section for My Library */}
<div className="pt-8 md:pt-10 pb-5 mb-4 border-b border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all">
  {/* Title & Icon Area */}
  <div className="flex items-center gap-3.5">
    {/* Icon Container with Subtle Glow */}
    <div className="p-2.5 rounded-xl bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 text-red-600 dark:text-red-500 shadow-sm shrink-0">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className="w-5 h-5 sm:w-6 sm:h-6"
      >
        <path fillRule="evenodd" d="M6.32 2.577a1.875 1.875 0 0 1 1.585-.852h8.19c.682 0 1.303.366 1.586.852l3.208 5.5a1.875 1.875 0 0 1-.22 2.164l-8.25 9.75a1.875 1.875 0 0 1-2.838 0l-8.25-9.75a1.875 1.875 0 0 1-.22-2.164l3.208-5.5ZM12 4.25a.75.75 0 0 1 .75.75v3.25h2.25a.75.75 0 0 1 0 1.5h-2.25v3.25a.75.75 0 0 1-1.5 0v-3.25H9a.75.75 0 0 1 0-1.5h2.25V5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
      </svg>
    </div>

    {/* Text Area */}
    <div>
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text">
        My Library
      </h1>
      <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-0.5">
        Your bookmarked and saved articles
      </p>
    </div>
  </div>

  {/* Saved Count Badge */}
  {blogs.length > 0 && (
    <div className="self-start sm:self-center inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/80 text-secondary-foreground border border-border/80 shadow-xs backdrop-blur-xs">
      <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
      <span className="text-xs font-semibold tracking-wide">
        {Math.min(visibleCount, blogs.length)} <span className="text-muted-foreground font-normal">of</span> {blogs.length} Saved
      </span>
    </div>
  )}
</div>

  {/* Exact Original Grid System */}
  <div
    className="grid gap-6 md:gap-10 items-stretch pt-3"
    style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
  >
    {blogs.length > 0 ? (
      blogs.slice(0, visibleCount).map((blog) => {
        return (
          <SavedBlogCard key={blog.blogid._id || blog.blogid.slug} blog={blog?.blogid} categoryname={blog?.categoryid} />
        );
      })
    ) : (
      <p className="text-muted-foreground text-center py-10 w-full col-span-full">
        Data Not Found
      </p>
    )}
  </div>

  {/* See More Button */}
  {blogs.length > 0 && visibleCount < blogs.length && (
    <div className="flex justify-center mt-8">
      <Button 
        onClick={() => setVisibleCount((prev) => prev + (window.innerWidth >= 768 ? 50 : 10))} 
        variant="outline"
      >
        See More
      </Button>
    </div>
  )}
</div>
  );
};

export default SavedBlog;