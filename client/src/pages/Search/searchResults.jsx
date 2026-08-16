"use client";

import React, { Suspense } from "react"; // <--- Make sure Suspense is explicitly imported
import BlogCard from "@/components/common/BlogCard";
import { useAxios } from "@/helper/useAxios";
import { useSearchParams } from "next/navigation"; 
import { SearchX } from "lucide-react";

const axiosOptions = {};

const SearchResultsContent = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const apiUrl = query 
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/search?q=${encodeURIComponent(query)}`
    : null;

  const {
    data: blogData,
    loading,
    error,
  } = useAxios(
    apiUrl, 
    axiosOptions, 
    [query]
  );

  return (
    <div className="max-w-6xl mx-auto pt-17 pb-10 px-2 md:px-0">
      <div className="flex items-center gap-3 text-xl md:text-3xl font-bold border-b pb-3 mb-5">
        <h4>
          Search Results For: <span className="text-red-600">"{query}"</span>
        </h4>
      </div>

      {loading ? (
        <div className="text-slate-500 font-medium py-10">Searching blogs...</div>
      ) : (
        <div
          className="grid gap-6 md:gap-10 items-stretch"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
        >
          {blogData && blogData?.blog?.length > 0 ? (
            blogData.blog.map((blog) => <BlogCard key={blog._id} blog={blog} />)
          ) : (
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-center sm:text-left py-8 px-6 bg-slate-50/50 dark:bg-slate-900/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 my-6">
  
  {/* Icon Container */}
  <div className="p-3.5 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-400 dark:text-slate-500 shrink-0">
    <SearchX className="w-6 h-6 sm:w-7 sm:h-7" />
  </div>

  {/* Text Content */}
  <div className="space-y-1">
    <h3 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-200">
      No Results Found
    </h3>
    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md">
      We couldn't find anything matching your search. Try checking for spelling errors or using different keywords.
    </p>
  </div>

</div>
          )}
        </div>
      )}
    </div>
  );
};

const SearchResults = () => {
  return (
    <Suspense fallback={<div className="max-w-6xl mx-auto py-8 px-4 text-slate-500">Loading...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
};

export default SearchResults;