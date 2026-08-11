'use client'
import BlogCard from "@/components/common/BlogCard";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const HomePage = ({ blogData }) => {
  // Mobile par 10, Laptop/Desktop par 50
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    // Agar screen width 768px se badi ho (md/laptop screens) to initial limit 50 kar do
    if (window.innerWidth >= 768) {
      setVisibleCount(50);
    }
  }, []);

  const blogs = blogData?.blog || [];

  return (
    
    <div className="mb-10 mt-7 px-3 md:px-8">

    {/* 🚀 Hero Section (Global CSS Typography Inherited) */}
      <section className="relative mb-8 md:mb-12 overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-b from-muted/40 via-background to-background p-5 sm:p-8 md:p-10 shadow-sm">
        {/* Background Glow */}
        <div className="absolute -top-24 -left-24 h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* Left Side: Content & H1 */}
          <div className="flex flex-col items-start gap-3 sm:gap-4 max-w-2xl">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 sm:px-3.5 sm:py-1.5 text-[11px] sm:text-xs text-primary backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Techfo Analyzer Feed
            </div>

            {/* SEO H1 */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl tracking-tight text-foreground leading-snug sm:leading-[1.15]">
              Explore <span className="text-red-600 dark:text-red-500 drop-shadow-[0_2px_10px_rgba(220,38,38,0.25)]">Tech Trends</span> & Digital Insights
            </h1>

            <p className="text-xs sm:text-base text-muted-foreground leading-relaxed max-w-xl">
  No fluff, no corporate hype — just deep technical breakdowns, cyber security insights, and real-world software engineering.
</p>
          </div>

          {/* Right Side: Graphic (Laptop view only) */}
          <div className="hidden md:flex shrink-0 items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-border/50 shadow-inner animate-pulse">
            <div className="relative w-28 h-28 lg:w-36 lg:h-36 flex items-center justify-center">
              
              {/* Floating Book Graphic */}
              <div className="animate-bounce transition-transform duration-1000">
                <svg className="w-20 h-20 lg:w-24 lg:h-24 text-red-600 dark:text-red-500 drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>

              {/* Particles */}
              <span className="absolute top-2 right-2 h-3 w-3 rounded-full bg-primary animate-ping opacity-75"></span>
              <span className="absolute bottom-2 left-2 h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
            </div>
          </div>

        </div>
      </section>
      {/* Blog Cards Grid */}
      <div
        className="grid gap-6 md:gap-10 items-stretch"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
      >
        {blogs.length > 0 ? (
          blogs.slice(0, visibleCount).map((blog) => (
            <BlogCard key={blog._id} props={blog} />
          ))
        ) : (
          <p>Data Not Found</p>
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

export default HomePage;