'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaRegTrashCan } from "react-icons/fa6";
import { handleDelete } from "@/helper/HandleDelete";
import { VscCommentDiscussionSparkle } from "react-icons/vsc";
import { FaRegComments } from "react-icons/fa6";


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
import { useAxios } from "@/helper/useAxios";
import { showToast } from "@/helper/showToast";
import moment from "moment";

const axiosOptions = { withCredentials: true };

const CommentDetails = () => {
  const [refresh, setrefresh] = useState(false);
  const {
    data: commentsData,
    loading,
    error,
  } = useAxios(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/comment/get-all-comments`,
    axiosOptions,
    [refresh],
  ); 
  

  const handledelete = async (id) => {
    const response = await handleDelete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/comment/delete-comment/${id}`,
    );
    setrefresh(!refresh);
    if (response) {
      showToast("success", response.data.message);
    } else {
      showToast("error", "Comment Not Deleted");
    }
  };


  return (
    <div className="w-full">
       <div className="mb-7 flex gap-2 items-center">
                <FaRegComments size={30} />
                <h2 className=" font-bold">
                  Total Comments <span className="text-red-500">( {commentsData?.comments?.length} )</span> 
                </h2>
              </div>
  <Card className="mb-20">
    <CardContent className="p-3 sm:p-6">
      {/* Heading Section */}
      <div className="mb-6 sm:mb-8 flex justify-center items-center gap-3">
        <VscCommentDiscussionSparkle size={27} className="text-primary" />
        <h1 className="text-xl sm:text-2xl  font-bold">All Comments</h1>
      </div>

      {/* Responsive Table Container */}
      <div className="w-full overflow-x-auto rounded-md border border-border">
        <Table className="min-w-[650px] w-full">
          <TableHeader>
            <TableRow className="font-extrabold bg-muted/50">
              <TableHead className="text-left min-w-[200px]">Blog Title</TableHead>
              <TableHead className="text-left min-w-[130px]">Comment By</TableHead>
              <TableHead className="text-left min-w-[130px]">Date</TableHead>
              <TableHead className="text-left min-w-[250px]">Comment</TableHead>
              <TableHead className="text-left min-w-[80px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {commentsData && commentsData.comments.length > 0 ? (
              commentsData.comments.map((comment) => (
                <TableRow key={comment?._id} className="align-top">
                  {/* Blog Title */}
                  <TableCell className="text-left py-3">
                    <div className="max-w-[220px] whitespace-normal break-words text-sm font-medium">
                      {comment?.blogid?.tittle}
                    </div>
                  </TableCell>

                  {/* Comment By */}
                  <TableCell className="text-left py-3 whitespace-nowrap font-medium text-sm">
                    {comment?.user?.name}
                  </TableCell>

                  {/* Date */}
                  <TableCell className="text-left py-3 whitespace-nowrap text-xs sm:text-sm text-muted-foreground">
                    <div>

                    {moment(comment?.createdAt).format("DD-MMMM-YYYY")}
                    </div>
                    <div>

                    {moment(comment?.createdAt).format("h:mm a")}
                    </div>
                  </TableCell>

                  {/* Comment Text */}
                  <TableCell className="text-left py-3">
                    <div className="max-w-[280px] whitespace-normal break-words text-sm">
                      {comment?.comment}
                    </div>
                  </TableCell>

                  {/* Action */}
                  <TableCell className="text-left py-3">
                    <Button
                      onClick={() => handledelete(comment._id)}
                      variant="outline"
                      className="hover:bg-red-600 hover:text-white transition-colors"
                      size="icon"
                    >
                      <FaRegTrashCan className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-red-500 py-10 font-medium">
                  Data Not Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
</div>
  );
};

export default CommentDetails;
