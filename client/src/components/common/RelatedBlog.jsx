import Link from "next/link";

const RelatedBlog = ({ relatedBlogData, categoryName }) => {

  const blogs = relatedBlogData?.relatedBlog || relatedBlogData || [];

  return (
    <div className="p-5 min-w-[280px] sm:min-w-[320px] w-full">
  <h2 className="text-2xl font-bold mb-4">Related Blogs</h2>

  <div className="space-y-3">
    {blogs && blogs.length > 0 ? (
      blogs.map((blog) => {
        // Agar category object hai toh slug nikaal lo, warna prop se fallback le lo
        const catSlug = blog.category?.slug || categoryName;

        return (
          <Link
            key={blog._id}
            href={`/blogs/${catSlug}/${blog.slug}`}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition group w-full"
          >
            <img
              className="w-[90px] h-[65px] sm:w-[100px] sm:h-[70px] object-cover rounded-md shrink-0"
              src={blog.featureImage || "/default-blog.jpg"}
              alt={blog.tittle || "Related Blog"}
            />
            {/* min-w-0 flex box mein truncating (...) ke liye sab se zaroori hota hai */}
            <div className="min-w-0 flex-1">
              <h4 className="line-clamp-2 text-sm sm:text-base font-semibold leading-snug group-hover:text-blue-600 transition break-words">
                {blog.tittle}
              </h4>
            </div>
          </Link>
        );
      })
    ) : (
      <div className="text-gray-500 text-sm">No Related Blog</div>
    )}
  </div>
</div>
  );
};

export default RelatedBlog;