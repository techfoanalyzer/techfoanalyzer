import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";

const BookCategoryShop = ({ bookData }) => {
  const category = bookData?.category;
  const books = bookData?.books || [];

  return (
    <>
      <div className="flex items-center gap-3 md:px-5 px-2 text-xl md:text-3xl font-bold mt-7 border-b pb-3 mb-5 pt-14">
        {category?.featureImage ? (
          <img
            src={category.featureImage}
            alt={category?.name || "Book Category"}
            className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover border"
          />
        ) : (
          <BookOpen size={30} />
        )}

        <div>
          <h1>{category?.name}</h1>

          <p className="text-xs md:text-sm font-normal text-muted-foreground mt-1">
            {books.length} {books.length === 1 ? "book" : "books"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5 items-stretch px-2 md:px-5 mb-10">
        {books.length > 0 ? (
          books.map((book) => (
            <article
              key={book?._id}
              className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-500/25 hover:shadow-lg"
            >
              {/* BOOK DETAIL LINK */}
              <Link
                href={`/shop/book/${book?._id}`}
                className="block"
                aria-label={`View ${book?.title || "Book"}`}
              >
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-muted/30">
                  <img
                    src={book?.featureImage}
                    alt={book?.title || "Book"}
                    className="h-full w-full object-contain p-1 sm:p-1.5 transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-3 sm:p-4">
                  <h2 className="line-clamp-2 min-h-[40px] text-sm font-bold leading-5 tracking-tight sm:min-h-[48px] sm:text-base sm:leading-6">
                    {book?.title}
                  </h2>

                  <p className="mt-2 line-clamp-3 text-[11px] leading-5 text-muted-foreground sm:text-xs sm:leading-5 md:text-sm">
                    {book?.description}
                  </p>
                </div>
              </Link>

              {/* BUY NOW */}
              <div className="px-3 pb-3 sm:px-4 sm:pb-4">
                <a
                  href={book?.buyNowUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-1 rounded-lg bg-red-600 px-2 py-2 text-[10px] font-bold text-white shadow-sm transition-all duration-200 hover:bg-red-700 hover:shadow-md active:scale-[0.98] sm:gap-1.5 sm:px-3 sm:py-2.5 sm:text-[11px] md:text-xs"
                >
                  BUY NOW

                  <ArrowUpRight
                    size={13}
                    className="shrink-0 sm:h-4 sm:w-4"
                  />
                </a>
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-full py-10 text-center text-muted-foreground">
            No books found in this category.
          </div>
        )}
      </div>
    </>
  );
};

export default BookCategoryShop;