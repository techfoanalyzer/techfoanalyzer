"use client"
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
import LoadingPage from "@/helper/Loading";


const axiosOptions = { withCredentials: true };


const CategoryDetails = () => {
  const [refresh, setrefresh] = useState(false);
  const {
    data: categoryData,
    loading,
    error,
  } = useAxios(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/category/all-category`,
    axiosOptions,
    [refresh]
  );

  const handledelete = async (id) => {
    const response = await handleDelete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/category/delete/${id}`);
    setrefresh(!refresh);
    if (response) {
      showToast("success", response.data.message);
    } else {
      showToast("error", "Category Not Deleted");
    }
  };

//   if (loading) return <LoadingPage/>;

  return (
    <div >
      <Card>
        <CardHeader>
          <div>
            <Button >
              <Link href={"/category/add"}>
              Add Category
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryData && categoryData.categories?.length > 0 ? (
                categoryData.categories.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell className="flex gap-3">
                      <Button variant="outline" className="hover:bg-red-600 hover:text-white" size="icon" >
                        <Link href={`/category/edit/${category._id}`}>
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

export default CategoryDetails;