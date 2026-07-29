// app/sitemap.js

export default async function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  let blogs = [];
  let categories = [];

  try {
    const [blogsRes, categoriesRes] = await Promise.all([
      fetch(`${apiBaseUrl}/blog/blogs`, {
        next: { revalidate: 3600 },
      }),
      fetch(`${apiBaseUrl}/category/all-category`, {
        next: { revalidate: 3600 },
      }),
    ]);

    if (blogsRes.ok) {
      const blogData = await blogsRes.json();
      blogs = blogData?.blog || [];
    }

    if (categoriesRes.ok) {
      const categoryData = await categoriesRes.json();
      categories = categoryData?.categories || [];
    }
  } catch (error) {
    console.error("Error fetching data for sitemap:", error);
  }

 
  const safeDate = (dateStr) => {
    try {
      return dateStr ? new Date(dateStr).toISOString() : new Date().toISOString();
    } catch {
      return new Date().toISOString();
    }
  };

 
  const blogUrls = blogs.map((item) => {
    const categorySlug = item.category?.slug || "general";

    return {
      url: `${siteUrl}/blogs/${categorySlug}/${item.slug}`,
      lastModified: safeDate(item.updatedAt || item.createdAt),
      changeFrequency: "weekly",
      priority: 0.8,
    };
  });


  const categoryUrls = categories.map((cat) => ({
    url: `${siteUrl}/blogs/${cat.slug}`, 
    lastModified: safeDate(cat.updatedAt || cat.createdAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

 
  const staticUrls = [
    {
      url: `${siteUrl}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/about-us`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms-and-conditions`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/disclaimer`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/contact-us`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  return [...staticUrls, ...categoryUrls, ...blogUrls];
}