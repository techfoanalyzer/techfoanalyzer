import { getBookCategoryBySlug } from "@/apiServices/Bookstore/Bookstore";
import BookCategoryShop from "@/pages/Bookstore/BookCategoryShop";
import { notFound } from "next/navigation";

export const revalidate = 3600;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.techfoanalyzer.com";

export async function generateMetadata({ params }) {
  const { category_slug } = await params;

  const bookCategory = await getBookCategoryBySlug(category_slug);

  if (!bookCategory || !bookCategory.category) {
    return {
      title: "Book Category Not Found | Techfo Analyzer",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const categoryName = bookCategory.category.name;

  const pageTitle = `${categoryName} Books | Techfo Analyzer`;

  const pageDescription = `Browse ${categoryName} books and learning resources available in the Techfo Analyzer bookstore.`;

  const pageUrl = `${SITE_URL}/shop/${category_slug}`;

  const categoryImage =
    bookCategory.category.featureImage ||
    `${SITE_URL}/og-home-banner.jpg`;

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
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: "Techfo Analyzer",
      type: "website",
      images: [
        {
          url: categoryImage,
          width: 1200,
          height: 630,
          alt: `${categoryName} Books`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [categoryImage],
    },
  };
}

const BookCategoryPage = async ({ params }) => {
  const { category_slug } = await params;

  const bookCategory = await getBookCategoryBySlug(category_slug);

  if (!bookCategory || !bookCategory.category) {
    notFound();
  }

  return (
    <main>
      <BookCategoryShop bookData={bookCategory} />
    </main>
  );
};

export default BookCategoryPage;