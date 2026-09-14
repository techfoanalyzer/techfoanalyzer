import { notFound } from "next/navigation";
import { getBook } from "@/apiServices/Bookstore/Bookstore";
import BookDetail from "@/pages/Bookstore/BookDetail";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.techfoanalyzer.com";

export async function generateMetadata({ params }) {
  const { book_id } = await params;

  const bookData = await getBook(book_id);
  const book = bookData?.book;

  if (!book) {
    return {
      title: "Book Not Found | Techfo Analyzer",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${book.title} | Techfo Analyzer Bookshop`;

  const description =
    book.description?.slice(0, 155) ||
    `Explore ${book.title} in the Techfo Analyzer Bookshop.`;

  const pageUrl = `${SITE_URL}/shop/book/${book_id}`;

  return {
    title,
    description,

    alternates: {
      canonical: pageUrl,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "Techfo Analyzer",
      type: "website",
      images: [
        {
          url: book.featureImage,
          alt: book.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [book.featureImage],
    },
  };
}

const BookPage = async ({ params }) => {
  const { book_id } = await params;

  const bookData = await getBook(book_id);

  if (!bookData?.book) {
    notFound();
  }

  const book = bookData.book;
  const category = book?.category;

  const pageUrl = `${SITE_URL}/shop/book/${book_id}`;

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Bookshop",
        item: `${SITE_URL}/shop`,
      },
      ...(category?.name && category?.slug
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: category.name,
              item: `${SITE_URL}/shop/${category.slug}`,
            },
          ]
        : []),
      {
        "@type": "ListItem",
        position: category?.name && category?.slug ? 4 : 3,
        name: book.title,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      <BookDetail bookData={bookData} />
    </>
  );
};

export default BookPage;