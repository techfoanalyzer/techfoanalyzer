import React from "react";
import { getBookCategories, getBooks } from "@/apiServices/Bookstore/Bookstore";
import Shop from "@/pages/Bookstore/Shop";

export const revalidate = 3600;

export const metadata = {
  title: "TechfoAnalyzer Bookstore",
  description:
    "Explore TechfoAnalyzer books covering AI, cybersecurity, programming, web development, and modern technology.",
  alternates: {
    canonical: "https://www.techfoanalyzer.com/shop",
  },
  openGraph: {
    title: "TechfoAnalyzer Bookstore",
    description:
      "Explore TechfoAnalyzer books covering AI, cybersecurity, programming, web development, and modern technology.",
    url: "https://www.techfoanalyzer.com/shop",
    type: "website",
  },
};

const ShopPage = async () => {
  const [categoryData, bookData] = await Promise.all([
    getBookCategories(),
    getBooks(),
  ]);

  return (
    <main>
      <Shop
        categoryData={categoryData}
        bookData={bookData}
      />
    </main>
  );
};

export default ShopPage;