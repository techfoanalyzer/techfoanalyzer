'use client'
import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import defaultIcon from "@/assets/images/logo.png";
import { MdVerified } from "react-icons/md";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import Link from "next/link";

const SavedBlogCard = ({ blog , categoryname }) => {
  
  

  return (
    <Link href={`/blogs/${categoryname?.slug}/${blog?.slug}`} className="group block">
      <Card className="pt-5 transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-md">
        <CardContent>
      
          <div className="flex justify-between items-center mx-1">
            <div className="flex gap-2 items-center">
              
            <Avatar>

  <AvatarImage 
    src={defaultIcon.src || defaultIcon}
    alt={blog?.tittle || "Author avatar"} 
  />
  <AvatarFallback className="bg-muted overflow-hidden">
    {defaultIcon ? (
      <img 
        src={defaultIcon.src || defaultIcon} 
        alt="Default logo" 
        className="w-full h-full object-cover" 
      />
    ) : (
      blog?.author?.name?.substring(0, 2).toUpperCase() || "AU"
    )}
  </AvatarFallback>
</Avatar>
              <span className="text-sm font-medium">{blog?.author?.name || "TechfoAnalyzer"}</span>
            </div>
            
              <MdVerified className="size-5 text-red-600" />

          </div>

          {/* Feature Image */}
          <div className="my-3 overflow-hidden rounded">
            <img 
              src={blog?.featureImage} 
              alt={blog?.tittle || blog?.title || "Blog feature image"} 
              className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105" 
            />
          </div>

          {/* Category Badge (Light Gray BG + Black Text) */}
          <div className="mt-4 mb-2">
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-gray-100 text-gray-900 border border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
              {categoryname?.name || "Tech"}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-lg font-bold tracking-tight line-clamp-2 transition-colors duration-200 group-hover:text-gray-700 dark:group-hover:text-gray-300 mb-3">
            {blog?.tittle || blog?.title}
          </h2>

          {/* Read Article Indicator */}
          <div className="inline-flex items-center text-xs font-semibold text-muted-foreground transition-colors duration-200 group-hover:text-gray-900 dark:group-hover:text-gray-100">
            <span>Read Article</span>
            <HiOutlineArrowNarrowRight className="ml-1 text-sm transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default memo(SavedBlogCard);