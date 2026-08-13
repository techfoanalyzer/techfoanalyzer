import BlogCard from "@/components/common/BlogCard";
import { TbCategory2 } from "react-icons/tb";

const CategoryBlogDetails = ({blogData}) => {


  

  return (
    <>
      <div className="flex items-center gap-3 md:px-5 px-2 text-xl md:text-3xl font-bold mt-7 border-b pb-3 mb-5 pt-14 ">
        <TbCategory2 />
        <h4 >{blogData && blogData.categoryData?.name}</h4>
      </div>
      <div
        className="grid gap-6 md:gap-10 items-stretch px-2 md:px-5 mb-10"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
      >
        {blogData && blogData?.blog.length > 0 ? (
          <>
            {blogData.blog.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </>
        ) : (
          <> Data Not Found</>
        )}
      </div>
    </>
  );
};

export default CategoryBlogDetails;
