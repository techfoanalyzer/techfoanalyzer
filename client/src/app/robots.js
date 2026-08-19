export default function robots() {
  const baseUrl = "https://www.techfoanalyzer.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/blog$",          
          "/blog/*",         
          "/category/", 
          "/search", 
          "/users/", 
          "/comments/",
          "/search", 
          "/sign-in", 
          "/sign-up", 
          "/profile", 
          "/forget-password",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}


// allow: [
//           "/",
//           "/blogs/*",  // Explicitly allow blogs path first
//         ],