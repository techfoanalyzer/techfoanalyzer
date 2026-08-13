"use client";

import React, { Suspense } from "react"; // <--- Make sure Suspense is explicitly imported
import BlogCard from "@/components/common/BlogCard";
import { useAxios } from "@/helper/useAxios";
import { useSearchParams } from "next/navigation"; 

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
            <p className="text-slate-500 font-medium py-10">Data Not Found</p>
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