import { getBlogByCategory } from '@/apiServices/category/allCatergory';
import CategoryBlogDetails from '@/pages/Category/CategoryBlogDetails';
import { notFound } from 'next/navigation';
import React from 'react';


const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://techfoanalyzer.com';


export async function generateMetadata({ params }) {
  const { category } = await params;
  const CategoryBlog = await getBlogByCategory(category);

  if (!CategoryBlog || !CategoryBlog.categoryData) {
    return {
      title: 'Category Not Found | Techfo Analyzer',
      robots: { index: false, follow: false }, 
    };
  }

  const catName = CategoryBlog?.categoryData?.name;
  const pageTitle = `${catName} Articles & Guides | Techfo Analyzer`;
  const pageDescription = `Browse the latest ${catName} articles, insights, tutorials, and tech news on Techfo Analyzer. Stay updated with expert posts in ${catName}.`;
  const pageUrl = `${SITE_URL}/blogs/${category}`;
  

  return {
    title: pageTitle,
    description: pageDescription,
    
    alternates: {
      canonical: pageUrl,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

   
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: 'Techfo Analyzer',
      type: 'website',
      images: [
        {
          url: CategoryBlog?.categoryData?.featureImage || `${SITE_URL}/og-default.jpg`, // Category Image ya default banner
          width: 1200,
          height: 630,
          alt: `${catName} Category Banner`,
        },
      ],
    },

   
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [CategoryBlog?.categoryData?.image || `${SITE_URL}/og-default.jpg`],
    },
  };
}


const CategoryBlogPage = async ({ params }) => {
  const { category } = await params;
  const CategoryBlog = await getBlogByCategory(category);

  if (!CategoryBlog || !CategoryBlog.categoryData) {
    notFound();
  }

  return (
    <main>
      <CategoryBlogDetails blogData={CategoryBlog} />
    </main>
  );
};

export default CategoryBlogPage;