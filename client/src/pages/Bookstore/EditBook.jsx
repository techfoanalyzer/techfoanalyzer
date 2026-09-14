"use client";

import { z } from "zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { showToast } from "@/helper/showToast";
import { useAxios } from "@/helper/useAxios";
import { useParams, useRouter } from "next/navigation";
import Dropzone from "react-dropzone";
import { PiUpload } from "react-icons/pi";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const bookFormSchema = z
  .object({
    title: z
      .string()
      .min(3, { message: "Title must be at least 3 characters long." })
      .max(150, { message: "Title can have a maximum of 150 characters." }),

    description: z
      .string()
      .min(3, { message: "Description must be at least 3 characters long." })
      .max(2000, {
        message: "Description can have a maximum of 2000 characters.",
      }),

    category: z
      .string()
      .min(1, { message: "Category selection is required." }),

    originalPrice: z.coerce
      .number()
      .min(0, { message: "Original Price cannot be negative." }),

    salePrice: z.coerce
      .number()
      .min(0, { message: "Sale Price cannot be negative." }),

    buyNowUrl: z
      .string()
      .url({ message: "Please enter a valid Buy Now URL." }),
  })
  .refine((data) => data.salePrice <= data.originalPrice, {
    message: "Sale Price cannot be greater than Original Price.",
    path: ["salePrice"],
  });

const axiosOptions = { withCredentials: true };

const EditBook = () => {
  const params = useParams();
  const book_id = params?.book_id;

  const router = useRouter();

  const [filePreview, setfilePreview] = useState();
  const [file, setfile] = useState();

  const { data: bookData } = useAxios(
    book_id
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/book/edit/${book_id}`
      : null,
    axiosOptions,
    [book_id]
  );

  const { data: categoryData } = useAxios(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/book-category/all-category`,
    axiosOptions
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      originalPrice: "",
      salePrice: "",
      buyNowUrl: "",
    },
  });

  const selectedCategoryId = watch("category");

  useEffect(() => {
    if (bookData?.book) {
      setValue("title", bookData?.book?.title || "");
      setValue("description", bookData?.book?.description || "");

      setValue(
        "category",
        bookData?.book?.category?._id ||
          bookData?.book?.category ||
          ""
      );

      setValue("originalPrice", bookData?.book?.originalPrice ?? "");
      setValue("salePrice", bookData?.book?.salePrice ?? "");
      setValue("buyNowUrl", bookData?.book?.buyNowUrl || "");
      setfilePreview(bookData?.book?.featureImage || "");
    }
  }, [bookData, setValue]);

  const handleFileSelection = async (files) => {
    const selectedFile = files[0];

    if (selectedFile) {
      const preview = URL.createObjectURL(selectedFile);
      setfile(selectedFile);
      setfilePreview(preview);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      if (file) {
        formData.append("file", file);
      }

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("originalPrice", data.originalPrice);
      formData.append("salePrice", data.salePrice);
      formData.append("buyNowUrl", data.buyNowUrl);

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/book/update/${book_id}`,
        formData,
        axiosOptions
      );

      if (response.data.success) {
        reset();
        setfile(null);
        setfilePreview(null);

        showToast(
          "success",
          response.data.message || "Book updated successfully"
        );

        router.push("/bookstore/books");
      }
    } catch (error) {
      console.log("Error updating book:", error);

      showToast(
        "error",
        error?.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <Card className="max-w-6xl mb-10 w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            Edit Book
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>

              <input
                type="text"
                placeholder="Enter Book Title"
                {...register("title")}
                className={`w-full px-3 py-2 border rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 transition-all ${
                  errors.title
                    ? "border-destructive focus:ring-destructive/20"
                    : "border-gray-200 focus:border-primary focus:ring-primary/10"
                }`}
              />

              {errors.title && (
                <p className="text-xs text-destructive font-medium mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>

              <textarea
                rows={6}
                placeholder="Enter Book Description"
                {...register("description")}
                className={`w-full px-3 py-2 border rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 transition-all resize-y ${
                  errors.description
                    ? "border-destructive focus:ring-destructive/20"
                    : "border-gray-200 focus:border-primary focus:ring-primary/10"
                }`}
              />

              {errors.description && (
                <p className="text-xs text-destructive font-medium mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <Dropzone
                onDrop={(acceptedFiles) =>
                  handleFileSelection(acceptedFiles)
                }
                multiple={false}
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps()}
                    className="flex flex-col w-36 cursor-pointer"
                  >
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Featured Image
                    </label>

                    <input {...getInputProps()} />

                    <div className="flex justify-center items-center w-36 h-44 border-2 border-dashed relative rounded-md overflow-hidden bg-gray-50">
                      {filePreview ? (
                        <img
                          src={filePreview}
                          alt="Book Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <PiUpload size={25} className="text-gray-400" />
                      )}
                    </div>
                  </div>
                )}
              </Dropzone>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>

              <Select
                value={watch("category") || ""}
                onValueChange={(value) =>
                  setValue("category", value, {
                    shouldValidate: true,
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Book Category">
                    {selectedCategoryId
                      ? categoryData?.categories?.find(
                          (category) =>
                            category._id === selectedCategoryId
                        )?.name
                      : undefined}
                  </SelectValue>
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {categoryData?.categories?.length > 0 &&
                      categoryData.categories.map((category) => (
                        <SelectItem
                          key={category._id}
                          value={category._id}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {errors.category && (
                <p className="text-xs text-destructive font-medium mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Original Price
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="e.g., 10"
                {...register("originalPrice")}
                className={`w-full px-3 py-2 border rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 transition-all ${
                  errors.originalPrice
                    ? "border-destructive focus:ring-destructive/20"
                    : "border-gray-200 focus:border-primary focus:ring-primary/10"
                }`}
              />

              {errors.originalPrice && (
                <p className="text-xs text-destructive font-medium mt-1">
                  {errors.originalPrice.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Sale Price
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="e.g., 8"
                {...register("salePrice")}
                className={`w-full px-3 py-2 border rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 transition-all ${
                  errors.salePrice
                    ? "border-destructive focus:ring-destructive/20"
                    : "border-gray-200 focus:border-primary focus:ring-primary/10"
                }`}
              />

              {errors.salePrice && (
                <p className="text-xs text-destructive font-medium mt-1">
                  {errors.salePrice.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Buy Now URL
              </label>

              <input
                type="url"
                placeholder="https://payhip.com/b/xxxxx"
                {...register("buyNowUrl")}
                className={`w-full px-3 py-2 border rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 transition-all ${
                  errors.buyNowUrl
                    ? "border-destructive focus:ring-destructive/20"
                    : "border-gray-200 focus:border-primary focus:ring-primary/10"
                }`}
              />

              {errors.buyNowUrl && (
                <p className="text-xs text-destructive font-medium mt-1">
                  {errors.buyNowUrl.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 font-semibold"
            >
              {isSubmitting ? "Updating..." : "Update Book"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditBook;