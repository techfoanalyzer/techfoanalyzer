'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAxios } from "@/helper/useAxios";
import { showToast } from "@/helper/showToast";
import { useState } from "react";
import { handleDelete } from "@/helper/HandleDelete";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import moment from "moment/moment";
import Link from "next/link";
import { LiaBlogSolid } from "react-icons/lia";

const axiosOptions = { withCredentials: true };

const BlogDetails = () => {
  const [refresh, setrefresh] = useState(false);
  const {
    data: blogData,
    loading,
    error,
  } = useAxios(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/get-all`, axiosOptions, [
    refresh,
  ]);

  
  
const handleBlogDelete = async (id) => {
  try {
    const response = await handleDelete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/delete/${id}`
    );

    if (response?.data?.success) {
      showToast("success", response.data.message || "Blog deleted successfully");
      setrefresh((prev) => !prev); // State safe toggle
    } else {
      showToast("error", response?.data?.message || "Blog not deleted");
    }
  } catch (error) {
    console.log("Error deleting blog:", error);
    showToast(
      "error",
      error?.response?.data?.message || "Failed to delete blog"
    );
  }
};

  

  return (
     <div>
        <div className="mb-7 flex gap-2 items-center">
          <LiaBlogSolid size={30} />
          <h2 className=" font-bold">
            Total Blogs <span className="text-red-500">( {blogData?.blog?.length} )</span> 
          </h2>
        </div>
      <Card>
        <CardHeader>
          <div className="mb-2" >
              <Link href={'/blog/create'}  >
            <Button className="cursor-pointer">
              Create Blog
            </Button>
              </Link>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center" >Author</TableHead>
                <TableHead className="text-center">Category Name</TableHead>
                <TableHead className="text-center">Tittle</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-center">Slug</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogData && blogData.blog.length > 0 ? (
                blogData.blog.map((blog) => (
                  <TableRow key={blog?._id}>
                    <TableCell className="text-center">{blog?.author?.name}</TableCell>
                    <TableCell className="text-center">{blog?.category?.name}</TableCell>
                    <TableCell>
                      <div className="w-100 whitespace-normal text-center break-words">
                        {blog?.tittle}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {/* {moment(blog?.createdAt).format(`DD-MM-YYYY (h:mm a)`)} */}
                      <div>
                        {moment(blog?.createdAt).format(`DD-MM-YYYY`)}
                      </div>
                      <div>
                        {moment(blog?.createdAt).format(`(h:mm a)`)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="w-100 whitespace-normal text-center break-words">
                        {blog?.slug}
                      </div>
                    </TableCell>
                    <TableCell className="flex gap-3">
                      <Link href={`/blog/edit/${blog?._id}`}>
                        <Button
                          variant="outline"
                          className="hover:bg-red-600 hover:text-white"
                          size="icon"
                        >
                          <FaEdit />
                        </Button>
                      </Link>

                      <Button
                        onClick={() => handleBlogDelete(blog._id)}
                        variant="outline"
                        className="hover:bg-red-600 hover:text-white"
                        size="icon"
                      >
                        <FaRegTrashCan />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="3">Data Not Found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogDetails;
