import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const BookDetail = ({ bookData }) => {
  const book = bookData?.book;

  const originalPrice = Number(book?.originalPrice);
  const salePrice = Number(book?.salePrice);

  const hasDiscount =
    Number.isFinite(originalPrice) &&
    Number.isFinite(salePrice) &&
    originalPrice > 0 &&
    salePrice < originalPrice;

  const discountPercentage = hasDiscount
    ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
    : 0;

  const savings = hasDiscount ? originalPrice - salePrice : 0;

  if (!book) {
    return (
      <main className="w-full">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <BookOpen
            size={42}
            className="mx-auto mb-4 text-muted-foreground"
          />

          <h1 className="text-xl font-bold">
            Book Not Found
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            The book you are looking for is no longer available.
          </p>

          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-700"
          >
            <ArrowLeft size={16} />
            Back to Bookshop
          </Link>
        </div>
      </main>
    );
  }

  const bookPageUrl =
    `${
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://www.techfoanalyzer.com"
    }/shop/book/${book?._id}`;

  const bookStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: book?.title,
    image: [book?.featureImage],
    description: book?.description,
    url: bookPageUrl,
    offers: {
      "@type": "Offer",
      url: bookPageUrl,
      priceCurrency: "USD",
      price: Number.isFinite(salePrice) ? salePrice : 0,
      ...(hasDiscount
        ? {
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: salePrice,
              priceCurrency: "USD",
            },
          }
        : {}),
    },
  };

  return (
    <main className="w-full">
      <div className="mx-auto max-w-7xl px-3 my-10 py-6 sm:px-5 sm:py-8 lg:px-8 lg:py-10">

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(bookStructuredData).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />

        {/* Breadcrumb */}
        <div className="mb-5 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap text-xs font-semibold text-muted-foreground sm:text-sm">
          <Link
            href="/shop"
            className="transition-colors hover:text-red-600 dark:hover:text-red-400"
          >
            Bookshop
          </Link>

          {book?.category?.name && book?.category?.slug && (
            <>
              <ChevronRight size={14} className="shrink-0" />

              <Link
                href={`/shop/${book.category.slug}`}
                className="transition-colors hover:text-red-600 dark:hover:text-red-400"
              >
                {book.category.name}
              </Link>
            </>
          )}

          <ChevronRight size={14} className="shrink-0" />

          <span className="truncate text-foreground">
            {book.title}
          </span>
        </div>

        {/* MAIN BOOK DETAIL */}
        <section className="relative overflow-hidden rounded-[28px] border border-border/70 bg-card shadow-sm">
          {/* Decorative Background */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-red-500/5 blur-3xl" />

          <div className="relative grid gap-8 p-5 sm:p-7 md:gap-10 md:p-10 lg:grid-cols-[minmax(280px,420px)_1fr] lg:p-12">

            {/* BOOK COVER */}
            <div className="flex items-start justify-center">
              <div className="relative w-full max-w-[340px] overflow-hidden rounded-2xl border border-border/70 bg-muted/20 shadow-xl">
                {hasDiscount && (
                  <div className="absolute left-3 top-3 z-10">
                    <span className="inline-flex items-center rounded-full bg-red-600 px-3 py-1.5 text-[10px] font-black tracking-wide text-white shadow-lg sm:text-xs">
                      {discountPercentage}% OFF
                    </span>
                  </div>
                )}

                <div className="aspect-[2/3] w-full">
                  <img
                    src={book.featureImage}
                    alt={book.title}
                    className="h-full w-full object-contain p-2 sm:p-3"
                  />
                </div>
              </div>
            </div>

            {/* BOOK INFORMATION */}
            <div className="flex min-w-0 flex-col justify-center">

              {/* CATEGORY */}
              {book?.category?.name && (
                <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-red-500/20 bg-red-500/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-red-600 sm:text-xs dark:text-red-400">
                  <BookOpen size={13} />
                  {book.category.name}
                </div>
              )}

              {/* TITLE */}
              <h1 className="max-w-3xl text-3xl font-black leading-[1.08] tracking-[-0.03em] text-foreground sm:text-4xl md:text-5xl">
                {book.title}
              </h1>

              {/* DESCRIPTION */}
              <div className="mt-6">
                <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  About this book
                </h2>

                <p className="max-w-3xl whitespace-pre-line text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                  {book.description}
                </p>
              </div>

              {/* PRICE */}
              <div className="mt-7 rounded-2xl border border-border/70 bg-muted/30 p-4 sm:p-5">
                <div className="flex flex-wrap items-end gap-x-4 gap-y-2">

                  {hasDiscount && (
                    <span className="text-sm font-medium text-muted-foreground line-through sm:text-base">
                      ${originalPrice}
                    </span>
                  )}

                  <span className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                    ${salePrice}
                  </span>

                  {hasDiscount && (
                    <span className="rounded-full bg-red-100 px-2.5 py-1 text-[10px] font-black text-red-600 dark:bg-red-950/40 dark:text-red-400 sm:text-xs">
                      SAVE {discountPercentage}%
                    </span>
                  )}
                </div>

                {hasDiscount && (
                  <p className="mt-2 text-xs font-medium text-muted-foreground">
                    You save ${savings} on this book.
                  </p>
                )}
              </div>

              {/* BUY NOW */}
              <div className="mt-6">
                <a
                  href={book.buyNowUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3.5 text-sm font-black tracking-wide text-white shadow-lg shadow-red-600/20 transition-all duration-200 hover:bg-red-700 hover:shadow-xl active:scale-[0.99] sm:w-auto sm:min-w-[220px]"
                >
                  BUY NOW
                  <ArrowUpRight size={18} />
                </a>
              </div>

              {/* TRUST INFO */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <CheckCircle2
                    size={16}
                    className="shrink-0 text-red-600"
                  />
                  Secure purchase through our partner
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Sparkles
                    size={16}
                    className="shrink-0 text-red-600"
                  />
                  Digital learning resource
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default BookDetail;