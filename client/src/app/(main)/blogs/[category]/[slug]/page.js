import { BlogPage, RelatedBlog } from "@/apiServices/BlogPage/BlogPage";
import SingleBlogPage from "@/pages/Blog/SingleBlogPage";
import { notFound } from "next/navigation";

export const revalidate = 60;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.techfoanalyzer.com";

export async function generateMetadata({ params }) {
  const { slug, category } = await params;

  const blogResponse = await BlogPage(slug);
  const blog = blogResponse?.blog;

  if (!blog) {
    return {
      title: "Blog Not Found | Techfo Analyzer",
      robots: { index: false, follow: false },
    };
  }

  // Description fallback chain & HTML cleaner
  const rawDescription =
    blog?.metaDescription ||
    blog?.summary ||
    blog?.blogContent
      ?.replace(/<[^>]*>/g, "")
      ?.replace(/\s+/g, " ")
      ?.trim()
      ?.slice(0, 155) ||
    "Read the latest update on Techfo Analyzer.";

  const postUrl = `${SITE_URL}/blogs/${category ? `${category}/` : ""}${slug}`;
  const imageUrl = blog?.featureImage || `${SITE_URL}/og-home-banner.jpg`;

  return {
    title: {
      absolute: blog?.tittle || "Blog Post",
    },
    description: rawDescription,

    // 1. Canonical URL Fix (Matching WWW Domain)
    alternates: {
      canonical: postUrl,
    },

    // 2. Google Crawling Rules
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // 3. Open Graph (Social Sharing)
    openGraph: {
      title: blog?.tittle,
      description: rawDescription,
      url: postUrl,
      siteName: "Techfo Analyzer",
      type: "article",
      publishedTime: blog?.createdAt,
      authors: [blog?.author?.name || "Techfo Analyzer Team"],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog?.tittle || "Blog feature image",
        },
      ],
    },

    // 4. Twitter Card
    twitter: {
      card: "summary_large_image",
      title: blog?.tittle,
      description: rawDescription,
      images: [imageUrl],
    },
  };
}

const blogDetailPage = async ({ params }) => {
  const { category, slug } = await params;

  const Data = await BlogPage(slug);

  if (!Data || !Data.blog) {
    notFound();
  }

  const RelatedData = await RelatedBlog(category, slug);

  const blog = Data.blog;

  const rawDescription =
    blog?.metaDescription ||
    blog?.summary ||
    blog?.blogContent
      ?.replace(/<[^>]*>/g, "")
      ?.replace(/\s+/g, " ")
      ?.trim()
      ?.slice(0, 155) ||
    "Read the latest update on Techfo Analyzer.";

  const postUrl = `${SITE_URL}/blogs/${category ? `${category}/` : ""}${slug}`;


  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog?.tittle,
    description: rawDescription,
   image: [
    blog?.featureImage || `${SITE_URL}/og-home-banner.jpg`
  ],
    datePublished: blog?.createdAt,
    dateModified: blog?.updatedAt || blog?.createdAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    author: {
      "@type": "Person",
      name: blog?.author?.name || "Techfo Analyzer Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Techfo Analyzer",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.png`,
      },
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SingleBlogPage
        blogData={Data}
        related={RelatedData}
        category={category}
        slug={slug}
      />
    </main>
  );
};

export default blogDetailPage;