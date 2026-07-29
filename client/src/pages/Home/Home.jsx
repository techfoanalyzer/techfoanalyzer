'use client'
import BlogCard from "@/components/common/BlogCard";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

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