import { BlogPage, RelatedBlog } from "@/apiServices/BlogPage/BlogPage";
import SingleBlogPage from "@/pages/Blog/SingleBlogPage";
import { notFound } from "next/navigation";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://techfoanalyzer.com";

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

  // console.log(blog);

  const rawDescription = blog?.blogContent
    ?.replace(/<[^>]*>/g, "")
    ?.trim()
    ?.slice(0, 160);

  const postUrl = `${SITE_URL}/blogs/${category ? `${category}/` : ""}${slug}`;
  const imageUrl = blog?.featureImage || `${SITE_URL}/default-blog.jpg`;

  // console.log(postUrl);
  // console.log(imageUrl);

  return {
    title: blog?.tittle || "Blog Post",
    description: rawDescription || "Read the latest update on this topic.",

    // 1. Canonical URL (Duplicate Content Defense)
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

    // 3. Open Graph (WhatsApp / Facebook / LinkedIn)
    openGraph: {
      title: blog?.tittle,
      description: rawDescription,
      url: postUrl,
      siteName: "Techfo Analyzer",
      type: "article",
      publishedTime: blog?.createdAt,
      authors: [blog?.author?.name || "Author"],
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
  const rawDescription = blog?.blogContent
    ?.replace(/<[^>]*>/g, "")
    ?.trim()
    ?.slice(0, 160);

  // Google Schema Markup (Rich Snippets ke liye)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog?.tittle,
    description: rawDescription,
    image: blog?.featureImage || `${SITE_URL}/default-blog.jpg`,
    datePublished: blog?.createdAt,
    author: {
      "@type": "Person",
      name: blog?.author?.name || "Author",
    },
  };

  return (
     (
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
    )
  );
};

export default blogDetailPage;
