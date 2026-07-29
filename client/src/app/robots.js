export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://techfoanalyzer.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/blog",        
        "/category",    
        "/users",       
        "/sign-in",     
        "/sign-up",     
        "/profile",     
        "/comments",
        "/forget-password",
        "/search",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}