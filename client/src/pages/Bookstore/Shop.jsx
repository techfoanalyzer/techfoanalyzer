import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const Shop = ({ categoryData, bookData }) => {
  const categories = categoryData?.categories || [];
  const books = bookData?.books || [];

  const getBooksForCategory = (categoryId) => {
    return books.filter(
      (book) => book?.category?._id === categoryId
    );
  };

  const getDiscountPercentage = (originalPrice, salePrice) => {
    const original = Number(originalPrice);
    const sale = Number(salePrice);

    if (
      !Number.isFinite(original) ||
      !Number.isFinite(sale) ||
      original <= 0 ||
      sale >= original
    ) {
      return 0;
    }

    return Math.round(((original - sale) / original) * 100);
  };

  return (
   <main className="w-full bg-background">
  <div className="mx-auto max-w-[1450px] my-10 px-3 py-6 sm:px-5 sm:py-8 lg:px-8 lg:py-10">

    {/* =========================
        SHOP HERO
    ========================== */}
    <section className="relative isolate overflow-hidden rounded-[28px] border border-red-100 bg-gradient-to-br from-white via-red-50/70 to-white shadow-[0_18px_60px_-30px_rgba(220,38,38,0.25)] dark:border-red-950/40 dark:from-card dark:via-red-950/20 dark:to-card">

      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />

      <div className="relative px-5 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 lg:px-14 lg:py-14">
        <div className="max-w-3xl">

          {/* Label */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-white/85 px-3.5 py-1.5 text-[10px] font-black tracking-[0.15em] text-red-600 shadow-sm dark:bg-card/80 dark:text-red-400 sm:text-xs">
            <Sparkles size={13} />
            TECHFOANALYZER BOOKSTORE
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-black leading-[1.05] tracking-[-0.03em] sm:text-4xl md:text-5xl lg:text-6xl">
            Discover books for{" "}
            <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-clip-text text-transparent">
              modern technology.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Practical books and learning resources covering artificial
            intelligence, cybersecurity, programming, web development, and
            emerging technology.
          </p>

          {/* Stats */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3.5 py-2 text-xs font-semibold shadow-sm">
              <BookOpen size={14} className="text-red-600" />
              {books.length} {books.length === 1 ? "Book" : "Books"}
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3.5 py-2 text-xs font-semibold shadow-sm">
              <Sparkles size={14} className="text-red-600" />
              {categories.length}{" "}
              {categories.length === 1
                ? "Category"
                : "Categories"}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* =========================
        CATEGORY COLLECTIONS
    ========================== */}
    <section className="mt-9 sm:mt-11">
      {categories.length > 0 ? (
        <div className="space-y-8 sm:space-y-10">

          {categories.map((category) => {
            const categoryBooks = getBooksForCategory(category._id);

            if (categoryBooks.length === 0) {
              return null;
            }

            const visibleBooks = categoryBooks.slice(0, 4);

            return (
              <section
                key={category._id}
                className="overflow-hidden rounded-[24px] border border-border/70 bg-card p-4 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-5 md:p-6"
              >

                {/* =========================
                    CATEGORY HEADER
                ========================== */}
                <div className="mb-5 flex items-center gap-3 sm:mb-6">

                  {/* Category Image */}
                  <div className="h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-border/70 bg-muted shadow-sm sm:h-13 sm:w-13">
                    <img
                      src={category.featureImage}
                      alt={category.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Category Info */}
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-lg font-black tracking-tight sm:text-xl md:text-2xl">
                      {category.name}
                    </h2>

                    <p className="mt-0.5 text-[11px] font-medium text-muted-foreground sm:text-xs">
                      {categoryBooks.length}{" "}
                      {categoryBooks.length === 1
                        ? "book"
                        : "books"}{" "}
                      available
                    </p>
                  </div>

                  {/* See All */}
                  {categoryBooks.length > 4 && (
                    <Link
                      href={`/shop/${category.slug}`}
                      className="group inline-flex shrink-0 items-center gap-1 rounded-full border border-red-500/20 bg-red-50 px-3 py-1.5 text-[10px] font-extrabold text-red-600 transition-all duration-200 hover:bg-red-600 hover:text-white sm:px-3.5 sm:py-2 sm:text-xs dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white"
                    >
                      See All
                      <ChevronRight
                        size={15}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </Link>
                  )}
                </div>

                {/* =========================
                    BOOK CAROUSEL
                ========================== */}
                <div className="relative">
                  <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-2 pr-1 [scrollbar-width:thin] sm:gap-4 lg:gap-5">

                    {visibleBooks.map((book) => {
                      const discountPercentage =
                        getDiscountPercentage(
                          book?.originalPrice,
                          book?.salePrice
                        );

                      return (
                        <article
                          key={book?._id}
                          className="group flex w-[calc(50%-6px)] min-w-0 shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-border/70 bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-500/25 hover:shadow-lg sm:w-[calc(33.333%-11px)] lg:w-[calc(25%-15px)]"
                        >

                          {/* =========================
                              BOOK DETAIL LINK
                          ========================== */}
                          <Link
                            href={`/shop/book/${book?._id}`}
                            className="block"
                            aria-label={`View ${book?.title}`}
                          >

                            {/* =========================
                                BOOK COVER
                            ========================== */}
                            <div className="relative aspect-[2/3] w-full overflow-hidden bg-muted/20">

                              <img
                                src={book?.featureImage}
                                alt={book?.title}
                                className="h-full w-full object-contain p-1 transition-transform duration-500 group-hover:scale-[1.035] sm:p-1.5"
                              />

                              {/* Top Discount Badge */}
                              {discountPercentage > 0 && (
                                <div className="absolute left-2.5 top-2.5 z-10">
                                  <span className="inline-flex rounded-full bg-red-600 px-2.5 py-1 text-[9px] font-black tracking-wide text-white shadow-md sm:text-[10px]">
                                    {discountPercentage}% OFF
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* =========================
                                BOOK INFO
                            ========================== */}
                            <div className="p-3 sm:p-3.5">

                              {/* Title */}
                              <h3 className="line-clamp-2 min-h-[40px] text-sm font-extrabold leading-5 tracking-tight text-foreground transition-colors duration-200 group-hover:text-red-600 sm:text-[15px] dark:group-hover:text-red-400">
                                {book?.title}
                              </h3>

                              {/* Description */}
                              <p className="mt-1.5 line-clamp-2 min-h-[36px] text-[11px] leading-[18px] text-muted-foreground sm:text-xs sm:leading-[19px]">
                                {book?.description}
                              </p>

                              {/* =========================
                                  PRICE AREA
                              ========================== */}
                              <div className="mt-2.5 rounded-xl bg-muted/35 px-2.5 py-2">

                                {discountPercentage > 0 ? (
                                  <>
                                    {/* Original Price */}
                                    <div className="text-[10px] font-medium leading-4 text-muted-foreground line-through sm:text-xs">
                                      ${book?.originalPrice}
                                    </div>

                                    {/* Sale Price + Bottom Discount */}
                                    <div className="mt-0.5 flex items-center justify-between gap-2">
                                      <span className="text-base font-black leading-5 text-foreground sm:text-lg">
                                        ${book?.salePrice}
                                      </span>

                                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-[8px] font-extrabold text-red-600 dark:bg-red-950/50 dark:text-red-400">
                                        SAVE {discountPercentage}%
                                      </span>
                                    </div>
                                  </>
                                ) : (
                                  <span className="text-base font-black leading-5 text-foreground sm:text-lg">
                                    ${book?.salePrice}
                                  </span>
                                )}
                              </div>
                            </div>
                          </Link>

                          {/* =========================
                              BUY NOW
                          ========================== */}
                          <div className="px-3 pb-3 sm:px-3.5 sm:pb-3.5">
                            <a
                              href={book?.buyNowUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-red-600 px-2.5 py-2.5 text-[10px] font-extrabold tracking-wide text-white shadow-sm transition-all duration-200 hover:bg-red-700 hover:shadow-md active:scale-[0.98] sm:text-[11px] md:text-xs"
                            >
                              BUY NOW

                              <ArrowUpRight
                                size={14}
                                className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              />
                            </a>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        /* =========================
            EMPTY STATE
        ========================== */
        <div className="rounded-[24px] border border-dashed border-border bg-muted/20 px-5 py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
            <BookOpen
              className="text-muted-foreground"
              size={30}
            />
          </div>

          <h2 className="mt-4 text-lg font-bold">
            No Book Categories Available
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Books will appear here once they are added to the bookstore.
          </p>
        </div>
      )}
    </section>
  </div>
</main> 
  );
};

export default Shop;