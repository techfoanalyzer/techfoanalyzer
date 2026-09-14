"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { handleDelete } from "@/helper/HandleDelete";
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
import Link from "next/link";

const axiosOptions = { withCredentials: true };

const BookCategoryDetails = () => {
  const [refresh, setrefresh] = useState(false);

  const {
    data: categoryData,
    loading,
    error,
  } = useAxios(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/book-category/all-category`,
    axiosOptions,
    [refresh]
  );

  const handledelete = async (id) => {
    const response = await handleDelete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/book-category/delete/${id}`
    );

    setrefresh(!refresh);

    if (response?.success) {
      showToast("success", response.data.message);
    } else {
      showToast(
        "error",
        response?.message || "Book Category Not Deleted"
      );
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <div>
            <Button>
              <Link href={"/bookstore/categories/add"}>
                Add Book Category
              </Link>
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feature Image</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {categoryData && categoryData.categories?.length > 0 ? (
                categoryData.categories.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell>
                      <img
                        src={category.featureImage}
                        alt={category.name}
                        className="w-20 h-14 object-cover rounded-md"
                      />
                    </TableCell>

                    <TableCell>{category.name}</TableCell>

                    <TableCell>{category.slug}</TableCell>

                    <TableCell className="flex gap-3">
                      <Button
                        variant="outline"
                        className="hover:bg-red-600 hover:text-white"
                        size="icon"
                      >
                        <Link
                          href={`/bookstore/categories/edit/${category._id}`}
                        >
                          <FaEdit />
                        </Link>
                      </Button>

                      <Button
                        onClick={() => handledelete(category._id)}
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
                  <TableCell colSpan="4">
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

export default BookCategoryDetails;