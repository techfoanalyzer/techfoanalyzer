"use client";

import Comment from "@/components/common/Comment";
import CommentCount from "@/components/common/CommentCount";
import LikeCount from "@/components/common/LikeCount";
import RelatedBlog from "@/components/common/RelatedBlog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import moment from "moment";
import React from "react";
import { useEffect, useRef } from 'react';


const SingleBlogPage = ({ blogData, related, category }) => {


  const contentRef = useRef(null);

useEffect(() => {
  if (!contentRef.current) return;

  const handleResponsiveDiagrams = () => {
    const preElements = contentRef.current?.querySelectorAll("pre");
    if (!preElements) return;

    preElements.forEach((pre) => {
      // 1. Full Clean Reset pehle karein
      pre.style.transform = "none";
      pre.style.transformOrigin = "top left";
      pre.style.width = "auto";
      pre.style.height = "auto";
      pre.style.marginBottom = "1.5rem";

      // 💻 Only Mobile Check (Real Hardware Screen Width)
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      if (!isMobile) return;

      const parentContainer = pre.parentElement;
      if (!parentContainer) return;

      // Real Device Render Padding Fix
      const parentWidth = parentContainer.getBoundingClientRect().width - 16;
      const contentWidth = pre.scrollWidth;

      if (parentWidth > 0 && contentWidth > parentWidth) {
        const scale = parentWidth / contentWidth;
        const originalHeight = pre.scrollHeight;

        // Frozen Layout Dimensions
        pre.style.width = `${contentWidth}px`;
        pre.style.height = `${originalHeight}px`;

        // Exact Fit Transform Scale
        pre.style.transform = `scale(${scale})`;

        // Real Mobile Height Gap Adjustment
        const actualVisualHeight = originalHeight * scale;
        const extraGap = originalHeight - actualVisualHeight;
        pre.style.marginBottom = `-${extraGap - 16}px`;
      }
    });
  };

  // Immediate Execution via Frame Animation (Fixes Real Mobile Delayed Render)
  const animId = requestAnimationFrame(handleResponsiveDiagrams);

  // Resize Observer for physical orientation & zoom changes
  const resizeObserver = new ResizeObserver(() => {
    handleResponsiveDiagrams();
  });

  if (contentRef.current) {
    resizeObserver.observe(contentRef.current);
  }

  return () => {
    cancelAnimationFrame(animId);
    resizeObserver.disconnect();
  };
}, [blogData?.blog?.blogContent]);

  return (
  <div className="w-full px-3 sm:px-5 md:px-8 py-4 mb-10">
  <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start w-full">
    {blogData && blogData.blog && (
      <>
       
        <div className="w-full lg:w-[70%] xl:w-[72%] border rounded-xl p-4 sm:p-6 lg:p-10 bg-background shadow-sm min-w-0">
          
     
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-snug text-foreground">
            {blogData?.blog?.tittle}
          </h1>

   
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-3 border-y border-border my-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                <AvatarImage src={blogData?.blog?.author?.avatar} />
              </Avatar>
              <div>
                <p className="font-semibold text-sm sm:text-base leading-tight">
                  {blogData?.blog?.author?.name}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  {moment(blogData?.blog?.createdAt).format("DD MMMM YYYY")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-2 sm:pt-0">
              <LikeCount props={{ blogid: blogData.blog._id }} />
              <CommentCount props={{ blogid: blogData.blog._id }} />
            </div>
          </div>

         
          <div className="my-6 w-full overflow-hidden rounded-xl bg-muted">
            <img
              src={blogData.blog.featureImage}
              alt={blogData?.blog?.tittle || "Blog feature image"}
              className="w-full aspect-video object-cover rounded-xl shadow-sm"
            />
          </div>
{/* <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-snug text-foreground">
            {blogData?.blog?.tittle}
          </h1> */}
        
<div 
    ref={contentRef}
    dangerouslySetInnerHTML={{
      __html: blogData?.blog?.blogContent || "",
    }}
    className={[
      "ck-content", 
      "prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none break-words leading-relaxed text-foreground",
      "[&_p]:mb-4 [&_p]:leading-relaxed [&_p]:text-sm [&_p]:sm:text-base [&_p]:lg:text-lg [&_p]:text-justify",
      "[&_h1]:text-xl [&_h1]:sm:text-2xl [&_h1]:lg:text-3xl [&_h1]:font-bold [&_h1]:mt-6 [&_h1]:mb-3",
      "[&_h2]:text-lg [&_h2]:sm:text-xl [&_h2]:lg:text-2xl [&_h2]:font-bold [&_h2]:mt-5 [&_h2]:mb-2",
      "[&_h3]:text-base [&_h3]:sm:text-lg [&_h3]:lg:text-xl [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2",
      "[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-3",
      "[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-3",
      "[&_li]:mb-1 [&_li]:text-sm [&_li]:sm:text-base [&_li]:lg:text-lg [&_li]:text-justify",
      
      /* 🖼️ Images Fix */
      "[&_figure]:w-full [&_figure]:max-w-full [&_figure]:my-6 [&_figure]:mx-auto [&_figure]:block",
      "[&_figure.table]:w-full [&_figure.table]:overflow-x-auto [&_figure.table]:block",
      "[&_img]:w-full [&_img]:max-w-full [&_img]:h-auto [&_img]:min-h-[180px] [&_img]:rounded-lg [&_img]:my-4 [&_img]:block [&_img]:object-cover",
      
      "[&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4",
      "[&_table]:w-full [&_table]:my-6 [&_table]:border-collapse [&_table]:min-w-[500px]",
      "[&_th]:border [&_th]:border-border [&_th]:p-3 [&_th]:bg-muted [&_th]:font-bold [&_th]:text-left",
      "[&_td]:border [&_td]:border-border [&_td]:p-3 [&_td]:text-sm [&_td]:sm:text-base",
      
      /* 📐 Diagrams Clean Rendering Fix */
      /* 📐 Dynamic Diagram Formatting Lock (ASCII Tree & Columns Preservation) */
"[&_pre]:bg-zinc-100 dark:[&_pre]:bg-zinc-800/90 [&_pre]:text-zinc-800 dark:[&_pre]:text-zinc-200",
"[&_pre]:p-3 [&_pre]:sm:p-4 [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-zinc-200 dark:[&_pre]:border-zinc-700",
"[&_pre]:my-6 [&_pre]:overflow-x-hidden",
"[&_pre]:[font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace]",
"[&_pre]:text-xs [&_pre]:sm:text-sm [&_pre]:leading-[1.2] [&_pre]:tracking-normal",
"[&_code]:whitespace-pre [&_code]:word-break-normal [&_code]:break-normal [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit",
    ].join(" ")}
  ></div>

          {/* Comments Section */}
          <div className="border-t mt-10 pt-6">
            <Comment
              className="mt-5"
              props={{ blogid: blogData.blog._id }}
            />
          </div>
        </div>
      </>
    )}

    {/* Sidebar - Expands proportionally alongside Main Card */}
    <div className="w-full lg:w-[35%] xl:w-[30%] h-fit border rounded-xl bg-background shadow-sm lg:sticky lg:top-24 z-10 shrink-0">
  <RelatedBlog relatedBlogData={related} categoryName={category} />
</div>
  </div>
</div>
  );
};

export default SingleBlogPage;