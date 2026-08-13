"use client";

import BlogCard from "@/components/common/BlogCard";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HomePage = ({ blogData }) => {
  // Mobile par 10, Laptop/Desktop par 50
  const [visibleCount, setVisibleCount] = useState(10);
  const [readersCount, setReadersCount] = useState(10420);
  const [mounted, setMounted] = useState(false);

  // Live Counter Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setReadersCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  // Safe Window Width Check
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      setVisibleCount(50);
    }
  }, []);

  const blogs = blogData?.blog || [];

  return (
    <div className="mb-10 mt-7 px-3 md:px-8">
      {/* Dynamic Keyframe Injection */}
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

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden py-8 md:py-12 px-1.5">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -z-10 h-72 w-72 rounded-full bg-red-600/15 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 -z-10 h-60 w-60 rounded-full bg-amber-500/10 blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-12">
          
          <div className="flex flex-col items-start gap-5 max-w-2xl text-left w-full">
            
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/5 px-3.5 py-1.5 text-xs font-semibold text-red-600 dark:text-red-400 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              HANDS-ON GUIDE
            </div>

            <div className="flex items-center justify-between gap-1 sm:gap-2 w-full">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15] flex-1">
                Explore <span className="bg-gradient-to-r from-red-600 via-red-500 to-amber-500 bg-clip-text text-transparent drop-shadow-xs">Tech Trends</span> & Digital Insights
              </h1>

              {/* Mobile Book Icon */}
              <div className="flex md:hidden shrink-0 items-center justify-center scale-65 sm:scale-75 origin-right -ml-3 sm:-ml-1">
                <div className="relative w-28 h-32 flex items-center justify-center [perspective:1000px] group">
                  
                  <div className="absolute w-22 h-28 rounded-lg border border-red-500/20 bg-card/60 backdrop-blur-xs shadow-md transform rotate-12 group-hover:rotate-16 transition-transform duration-500 ease-out flex flex-col p-2 gap-1">
                    <div className="h-1 w-8 rounded-full bg-red-500/30" />
                    <div className="h-0.5 w-14 rounded-full bg-muted-foreground/20" />
                    <div className="h-0.5 w-10 rounded-full bg-muted-foreground/20" />
                  </div>

                  <div className="absolute w-22 h-28 rounded-lg border border-red-500/30 bg-card/80 backdrop-blur-xs shadow-lg transform -rotate-6 group-hover:-rotate-12 transition-transform duration-500 ease-out flex flex-col p-2 gap-1">
                    <div className="h-1 w-6 rounded-full bg-red-500/50" />
                    <div className="h-0.5 w-12 rounded-full bg-muted-foreground/30" />
                    <div className="h-0.5 w-8 rounded-full bg-muted-foreground/30" />
                  </div>

                  <div className="relative w-24 h-30 rounded-xl border border-red-500/40 bg-gradient-to-br from-card via-card to-red-950/20 shadow-xl p-2 flex flex-col justify-between animate-[paperFlip_4s_ease-in-out_infinite] origin-left">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse shrink-0" />
                        <span className="text-[7px] font-mono font-semibold tracking-wider text-muted-foreground uppercase truncate">TECHFO</span>
                      </div>
                      <div className="h-1.5 w-10 rounded-full bg-red-600/80" />
                      <div className="h-0.5 w-14 rounded-full bg-muted-foreground/40 mt-0.5" />
                      <div className="h-0.5 w-10 rounded-full bg-muted-foreground/30" />
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-border/40">
                      <svg className="w-3.5 h-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <span className="h-1 w-1 rounded-full bg-red-500 animate-ping" />
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
              No fluff, no corporate hype — just deep technical breakdowns, cybersecurity insights, and real-world software engineering.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-mono text-muted-foreground mr-1">Trending:</span>
              {[
                { name: '#WebDev', slug: 'web-development' },
                { name: '#Cyber Security', slug: 'cyber-security' },
                { name: '#AppDev', slug: 'app-development' },
                { name: '#AI', slug: 'artificial-intelligence' }
              ].map((tag) => (
                <Link 
                  key={tag.name}
                  href={`/blogs/${tag.slug}`}
                  className="text-[11px] font-medium px-2.5 py-1 rounded-md transition-all duration-150 inline-block select-none bg-red-500/10 text-red-600 border border-red-500/20 active:bg-red-500/30 active:text-red-700 active:border-red-500/40 active:scale-95 md:bg-muted/40 md:text-foreground md:border-border/40 md:hover:bg-red-500/10 md:hover:text-red-600 md:hover:border-red-500/30"
                >
                  {tag.name}
                </Link>
              ))}
            </div>

            {/* Live Metrics Bar */}
<div className="flex items-center justify-start gap-2.5 sm:gap-4 pt-2 text-[11px] sm:text-xs text-muted-foreground border-t border-border/40 w-fit">
  {/* 1. Weekly Updates */}
  <div className="flex items-center gap-1.5 shrink-0 whitespace-nowrap text-red-600 dark:text-red-400 font-medium">
    <svg className="w-3.5 h-3.5 animate-spin text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
    <span className="font-mono text-foreground">Weekly Updates</span>
  </div>

  <div className="h-3 w-px bg-border/60 shrink-0" />

  {/* 2. Readers Active */}
  <div className="flex items-center gap-1.5 shrink-0 whitespace-nowrap">
    <svg className="w-3.5 h-3.5 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
    </svg>
    <span>
      <strong className="font-semibold text-foreground font-mono transition-all">
        {mounted ? readersCount.toLocaleString() : "10,420"}
      </strong>{" "}
      Active Users
    </span>
  </div>

  <div className="h-3 w-px bg-border/60 shrink-0" />

  {/* 3. Articles */}
  <div className="shrink-0 whitespace-nowrap">
    <strong className="font-semibold text-foreground font-mono">50+</strong> Articles
  </div>
</div>

          </div>

          {/* Desktop Book Flipper */}
          <div className="hidden md:flex shrink-0 items-center justify-center p-2 md:p-4 md:scale-100 transition-transform">
            <div className="relative w-48 h-52 flex items-center justify-center [perspective:1000px] group">
              
              <div className="absolute w-36 h-44 rounded-lg border border-red-500/20 bg-card/60 backdrop-blur-xs shadow-md transform rotate-12 group-hover:rotate-16 transition-transform duration-500 ease-out flex flex-col p-3.5 gap-2">
                <div className="h-1.5 w-14 rounded-full bg-red-500/30" />
                <div className="h-1 w-24 rounded-full bg-muted-foreground/20" />
                <div className="h-1 w-20 rounded-full bg-muted-foreground/20" />
              </div>

              <div className="absolute w-36 h-44 rounded-lg border border-red-500/30 bg-card/80 backdrop-blur-xs shadow-lg transform -rotate-6 group-hover:-rotate-12 transition-transform duration-500 ease-out flex flex-col p-3.5 gap-2">
                <div className="h-1.5 w-12 rounded-full bg-red-500/50" />
                <div className="h-1 w-22 rounded-full bg-muted-foreground/30" />
                <div className="h-1 w-16 rounded-full bg-muted-foreground/30" />
              </div>

              <div className="relative w-40 h-48 rounded-xl border border-red-500/40 bg-gradient-to-br from-card via-card to-red-950/20 shadow-2xl p-4 flex flex-col justify-between animate-[paperFlip_4s_ease-in-out_infinite] origin-left">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between gap-1">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse shrink-0" />
                    <span className="text-[9px] font-mono font-semibold tracking-wider text-muted-foreground uppercase truncate">TECHFOANALYZER</span>
                  </div>
                  <div className="h-2 w-20 rounded-full bg-red-600/80" />
                  <div className="h-1 w-28 rounded-full bg-muted-foreground/40 mt-1" />
                  <div className="h-1 w-24 rounded-full bg-muted-foreground/30" />
                  <div className="h-1 w-16 rounded-full bg-muted-foreground/20" />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/40">
                  <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
                </div>
              </div>

            </div>
          </div>

        </div>

        <div className="mt-8 md:mt-12 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
      </section>

      {/* Blog Grid */}
      <div
        className="grid gap-6 md:gap-10 items-stretch"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
      >
        {blogs.length > 0 ? (
          blogs.slice(0, visibleCount).map((blog) => (
            <BlogCard key={blog._id || blog.slug} blog={blog} />
          ))
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

export default HomePage;