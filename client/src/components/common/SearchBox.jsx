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
       className="h-9 sm:h-10 rounded-full bg-black/30 dark:bg-black/50 md:bg-transparent border border-white/60 dark:border-white/40 md:border-slate-200 md:dark:border-zinc-800 text-white md:text-zinc-900 md:dark:text-zinc-100 placeholder:text-white/70 md:placeholder:text-zinc-400 backdrop-blur-md md:backdrop-blur-none !outline-none !ring-0 focus:!border-white md:focus:!border-red-500 transition-all shadow-lg md:shadow-none"
      />
    </form>
  );
};

export default SearchBox;