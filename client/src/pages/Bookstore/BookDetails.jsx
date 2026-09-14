"use client";

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
import Link from "next/link";
import { LiaBookOpenSolid } from "react-icons/lia";

const axiosOptions = { withCredentials: true };

const BookDetails = () => {
  const [refresh, setrefresh] = useState(false);

  const {
    data: bookData,
    loading,
    error,
  } = useAxios(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/book/get-all`,
    axiosOptions,
    [refresh]
  );

  const handleBookDelete = async (id) => {
    try {
      const response = await handleDelete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/book/delete/${id}`
      );

      if (response?.data?.success) {
        showToast(
          "success",
          response.data.message || "Book deleted successfully"
        );
        setrefresh((prev) => !prev);
      } else {
        showToast(
          "error",
          response?.data?.message || "Book not deleted"
        );
      }
    } catch (error) {
      console.log("Error deleting book:", error);
      showToast(
        "error",
        error?.response?.data?.message || "Failed to delete book"
      );
    }
  };

  return (
    <div>
      <div className="mb-7 flex gap-2 items-center">
        <LiaBookOpenSolid size={30} />
        <h2 className="font-bold">
          Total Books{" "}
          <span className="text-red-500">
            ( {bookData?.books?.length || 0} )
          </span>
        </h2>
      </div>

      <Card>
        <CardHeader>
          <div className="mb-2">
            <Link href={"/bookstore/books/add"}>
              <Button className="cursor-pointer">
                Add Book
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">
                  Feature Image
                </TableHead>
                <TableHead className="text-center">
                  Category
                </TableHead>
                <TableHead className="text-center">
                  Title
                </TableHead>
                <TableHead className="text-center">
                  Description
                </TableHead>
                <TableHead className="text-center">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {bookData && bookData.books?.length > 0 ? (
                bookData.books.map((book) => (
                  <TableRow key={book?._id}>
                    <TableCell>
                      <div className="flex justify-center">
                        <img
                          src={book?.featureImage}
                          alt={book?.title}
                          className="w-20 h-28 object-cover rounded-md"
                        />
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      {book?.category?.name}
                    </TableCell>

                    <TableCell>
                      <div className="w-100 whitespace-normal text-center break-words">
                        {book?.title}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="w-100 whitespace-normal text-center break-words">
                        {book?.description}
                      </div>
                    </TableCell>

                    <TableCell className="flex gap-3">
                      <Link href={`/bookstore/books/edit/${book?._id}`}>
                        <Button
                          variant="outline"
                          className="hover:bg-red-600 hover:text-white"
                          size="icon"
                        >
                          <FaEdit />
                        </Button>
                      </Link>

                      <Button
                        onClick={() => handleBookDelete(book?._id)}
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
                  <TableCell colSpan="5">
                    Data Not Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookDetails;