"use client";

import Comment from "@/components/common/Comment";
import CommentCount from "@/components/common/CommentCount";
import LikeCount from "@/components/common/LikeCount";
import RelatedBlog from "@/components/common/RelatedBlog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-light.css";
import TextToSpeech from "@/components/common/TextToSpeech";

const SingleBlogPage = ({ blogData, related, category }) => {
  const contentRef = useRef(null);

  // 1. Mobile & Narrow Viewport Pre-Scale Effect
  useEffect(() => {
    if (!contentRef.current) return;

    const preElements = contentRef.current.querySelectorAll("pre");

    preElements.forEach((pre) => {
      pre.style.transform = "none";
      pre.style.transformOrigin = "top left";
      pre.style.width = "auto";
      pre.style.height = "auto";
      pre.style.marginBottom = "1.5rem";

      const parentContainer = pre.parentElement;
      if (!parentContainer) return;

      const availableWidth = parentContainer.clientWidth;
      const contentWidth = pre.scrollWidth;

      if (availableWidth > 0 && contentWidth > availableWidth) {
        const scale = (availableWidth - 8) / contentWidth;
        const originalHeight = pre.scrollHeight;

        pre.style.width = `${contentWidth}px`;
        pre.style.height = `${originalHeight}px`;
        pre.style.transform = `scale(${scale})`;

        const visualScaledHeight = originalHeight * scale;
        const heightGap = originalHeight - visualScaledHeight;
        pre.style.marginBottom = `-${heightGap - 12}px`;
      }
    });
  }, [blogData?.blog?.blogContent]);

  // 2. Dynamic Image Alt Injection (SEO Fix)
  useEffect(() => {
    if (!contentRef.current || !blogData?.blog?.tittle) return;

    const images = contentRef.current.querySelectorAll("img");
    const blogTitle = blogData.blog.tittle;

    images.forEach((img, index) => {
      if (!img.getAttribute("alt") || img.getAttribute("alt").trim() === "") {
        const altText =
          index === 0 ? blogTitle : `${blogTitle} - Figure ${index + 1}`;
        img.setAttribute("alt", altText);
      }
    });
  }, [blogData?.blog?.blogContent, blogData?.blog?.tittle]);

  // 3. Syntax Highlighting + Strict Code-Only Copy Button Injector
useEffect(() => {
  if (!contentRef.current) return;

  const preBlocks = contentRef.current.querySelectorAll("pre");

  preBlocks.forEach((pre) => {
    const codeBlock = pre.querySelector("code");

    // A. Code Block Syntax Highlighting Apply Karein
    if (codeBlock && !codeBlock.dataset.highlighted) {
      hljs.highlightElement(codeBlock);
    }

    // B. STRICT FILTER: Plain text & non-programming classes ko EXCLUDE karein
    const classes = codeBlock ? Array.from(codeBlock.classList) : [];

    const isPlaintext = classes.some(
      (cls) =>
        cls === "language-plaintext" ||
        cls === "language-text" ||
        cls === "plaintext" ||
        cls === "text"
    );

    const hasProgrammingLanguage = classes.some(
      (cls) =>
        (cls.startsWith("language-") || cls.startsWith("hljs")) && !isPlaintext
    );

    // 🛑 Agar language select nahi hui ya Plaintext choose kiya gaya hai, to button NAHI aayega
    if (!hasProgrammingLanguage || isPlaintext) return;

    // C. Duplicate button check
    if (pre.querySelector(".copy-code-btn")) return;

    pre.style.position = "relative";

    // D. Create Copy Button
    const button = document.createElement("button");
    button.className =
      "copy-code-btn absolute top-2 right-2 px-2.5 py-1 text-xs font-medium bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-200 rounded-md transition-all duration-200 flex items-center gap-1 shadow-sm opacity-90 hover:opacity-100 z-10 select-none";

    button.innerHTML = `
      <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
      <span>Copy</span>
    `;

    // E. Clean Code Text Copy Event
    button.addEventListener("click", async () => {
      const cleanCodeText = codeBlock ? codeBlock.innerText : "";

      if (!cleanCodeText) return;

      try {
        await navigator.clipboard.writeText(cleanCodeText);

        button.innerHTML = `
          <svg class="w-3.5 h-3.5 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          <span class="text-green-600 dark:text-green-400 font-semibold">Copied!</span>
        `;

        setTimeout(() => {
          button.innerHTML = `
            <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            <span>Copy</span>
          `;
        }, 2000);
      } catch (err) {
        console.error("Failed to copy code: ", err);
      }
    });

    pre.appendChild(button);
  });
}, [blogData?.blog?.blogContent]);
  return (
    <div className="w-full px-3 sm:px-5 md:px-8 pt-17 mb-10">
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start w-full">
        {blogData && blogData.blog && (
          <>
            <div className="w-full lg:w-[70%] xl:w-[72%] border rounded-xl p-4 sm:p-6 lg:p-10 bg-background shadow-sm min-w-0">
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-snug text-foreground">
                {blogData?.blog?.tittle}
              </h1>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-3 border-y border-border my-4">
                <div className="flex items-center gap-3">
                  <Link href={"/"}>
                    <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                      <AvatarImage
                        src={blogData?.blog?.author?.avatar}
                        alt={blogData?.blog?.author?.name || "Author Avatar"}
                      />
                    </Avatar>
                  </Link>
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

              <TextToSpeech 
        title={blogData?.blog?.tittle} 
        textToRead={blogData?.blog?.blogContent} // Blog HTML/Markdown string
      />

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

                  /* 🖼️ MOBILE & LAPTOP IMAGE DISPLAY FIX */
                  "[&_figure]:w-full [&_figure]:max-w-full [&_figure]:my-6 [&_figure]:mx-auto [&_figure]:block [&_figure]:clear-both [&_figure]:overflow-hidden",
                  "[&_figure.table]:w-full [&_figure.table]:overflow-x-auto [&_figure.table]:block",
                  "[&_img]:w-full [&_img]:max-w-full [&_img]:aspect-[16/9] [&_img]:object-cover [&_img]:rounded-lg [&_img]:my-4 [&_img]:block",

                  "[&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4",
                  "[&_table]:w-full [&_table]:my-6 [&_table]:border-collapse [&_table]:min-w-[500px]",
                  "[&_th]:border [&_th]:border-border [&_th]:p-3 [&_th]:bg-muted [&_th]:font-bold [&_th]:text-left",
                  "[&_td]:border [&_td]:border-border [&_td]:p-3 [&_td]:text-sm [&_td]:sm:text-base",

                  /* 💻 LIGHT BACKGROUND + COLORFUL SYNTAX HIGHLIGHTING */
                  "[&_pre]:!bg-zinc-100 dark:[&_pre]:!bg-zinc-800/90",
                  "[&_pre]:p-3 [&_pre]:sm:p-4 [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-zinc-200 dark:[&_pre]:border-zinc-700",
                  "[&_pre]:my-6 [&_pre]:overflow-x-hidden",
                  "[&_pre]:[font-family:Consolas,Monaco,'Courier_New',monospace]",
                  "[&_pre]:text-xs [&_pre]:sm:text-sm [&_pre]:leading-snug [&_pre]:tracking-normal",
                  "[&_pre]:[tab-size:4] [&_pre]:[font-variant-ligatures:none]",
                  "[&_code]:whitespace-pre [&_code]:[word-break:normal] [&_code]:[overflow-wrap:normal] [&_code]:!bg-transparent [&_code]:p-0 [&_code]:[font-family:inherit]",
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

        {/* Sidebar */}
        <div className="w-full lg:w-[35%] xl:w-[30%] h-fit border rounded-xl bg-background shadow-sm lg:sticky lg:top-24 z-10 shrink-0">
          <RelatedBlog relatedBlogData={related} categoryName={category} />
        </div>
      </div>
    </div>
  );
};

export default SingleBlogPage;