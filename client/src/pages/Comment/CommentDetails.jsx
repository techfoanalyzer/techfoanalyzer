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

  const commentsList = commentsData?.comments || [];

  return (
    <div className="w-full pt-16 md:pt-17 px-3 md:px-5">
      {/* Top Header */}
      <div className="mb-5 sm:mb-7 flex gap-2 items-center">
        <FaRegComments size={26} className="shrink-0" />
        <h2 className="font-bold text-base sm:text-lg">
          Total Comments{" "}
          <span className="text-red-500">
            ( {loading ? "..." : commentsList.length} )
          </span>
        </h2>
      </div>

      <Card className="mb-20">
        <CardContent className="p-3 sm:p-6">
          {/* Main Heading */}
          <div className="mb-6 sm:mb-8 flex justify-center items-center gap-2.5">
            <VscCommentDiscussionSparkle size={26} className="text-primary shrink-0" />
            <h1 className="text-xl sm:text-2xl font-bold">All Comments</h1>
          </div>

          {/* Conditional Rendering based on state */}
          {loading ? (
            /* Loading State Skeletons */
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-16 w-full bg-muted animate-pulse rounded-md" />
              ))}
            </div>
          ) : commentsList.length === 0 ? (
            /* Perfectly Centered Responsive Empty State */
            <div className="py-12 px-4 text-center border border-dashed border-border rounded-lg bg-muted/20">
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="p-3 rounded-full bg-muted text-muted-foreground mb-1">
                  <VscCommentDiscussionSparkle size={28} />
                </div>
                <p className="text-base font-semibold text-foreground">No Comments Found</p>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-xs">
                  There are no comments available to display right now.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* MOBILE VIEW: Clean Card List */}
              <div className="block md:hidden space-y-4 ">
                {commentsList.map((comment) => (
                  <div 
                    key={comment?._id} 
                    className="p-4 rounded-lg border border-border bg-card shadow-xs flex flex-col gap-3"
                  >
                    <div className="flex justify-between items-start gap-2 border-b border-border/60 pb-2">
                      <div>
                        <h3 className="font-semibold text-sm line-clamp-2">
                          {comment?.blogid?.tittle}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          By <span className="font-medium text-foreground">{comment?.user?.name}</span>
                        </p>
                      </div>
                      <Button
                        onClick={() => handledelete(comment._id)}
                        variant="outline"
                        className="hover:bg-red-600 hover:text-white transition-colors shrink-0"
                        size="icon"
                      >
                        <FaRegTrashCan className="h-3.5 w-3.5" />
                      </Button>
                    </div>

                    <p className="text-sm text-foreground/90 break-words">
                      {comment?.comment}
                    </p>

                    <div className="text-[11px] text-muted-foreground self-end">
                      {moment(comment?.createdAt).format("DD-MMMM-YYYY • h:mm a")}
                    </div>
                  </div>
                ))}
              </div>

              {/* DESKTOP VIEW: Full Data Table */}
              <div className="hidden md:block w-full overflow-x-auto rounded-md border border-border">
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
                    {commentsList.map((comment) => (
                      <TableRow key={comment?._id} className="align-top">
                        <TableCell className="text-left py-3">
                          <div className="max-w-[220px] whitespace-normal break-words text-sm font-medium">
                            {comment?.blogid?.tittle}
                          </div>
                        </TableCell>

                        <TableCell className="text-left py-3 whitespace-nowrap font-medium text-sm">
                          {comment?.user?.name}
                        </TableCell>

                        <TableCell className="text-left py-3 whitespace-nowrap text-xs sm:text-sm text-muted-foreground">
                          <div>{moment(comment?.createdAt).format("DD-MMMM-YYYY")}</div>
                          <div>{moment(comment?.createdAt).format("h:mm a")}</div>
                        </TableCell>

                        <TableCell className="text-left py-3">
                          <div className="max-w-[280px] whitespace-normal break-words text-sm">
                            {comment?.comment}
                          </div>
                        </TableCell>

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
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CommentDetails;