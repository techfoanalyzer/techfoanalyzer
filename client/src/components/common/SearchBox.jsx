"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation"; 
import { RouteSearch } from "@/helper/RouteName";

const SearchBox = () => {
  const router = useRouter(); 
  const [query, setQuery] = useState("");

  const getInput = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanQuery = query.trim();
    if (cleanQuery) {
      // Direct cleanQuery pass karein, RouteSearch function query param handle karega
      router.push(RouteSearch(cleanQuery));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="q"
        value={query}
        onChange={getInput} 
        placeholder="Search Here..."
        className="h-9 rounded-full border border-slate-200 !outline-none !ring-0 !ring-offset-0 focus:!border-red-500 focus-visible:!ring-0 focus-visible:!ring-offset-0 transition-colors"
      />
    </form>
  );
};

export default SearchBox;