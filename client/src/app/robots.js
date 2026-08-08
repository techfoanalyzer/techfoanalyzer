// app/robots.js

export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.techfoanalyzer.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/blog",           
        "/blog/",          
        "/category/",      
        "/search",        
        "/users/", 
        "/comments/",
        "/sign-in", 
        "/sign-up", 
        "/profile", 
        "/forget-password",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}