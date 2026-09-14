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

const bookCategoryFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." })
    .max(50, { message: "Name can be a maximum of 50 characters long." }),
});

const EditBookCategory = () => {
  const { category_id } = useParams() || {};

  const [filePreview, setfilePreview] = useState();
  const [file, setfile] = useState();

  const {
    data: categoryData,
    loading,
    error,
  } = useAxios(
    category_id
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/book-category/show/${category_id}`
      : null,
    { withCredentials: true },
    [category_id]
  );

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(bookCategoryFormSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (categoryData) {
      setValue("name", categoryData?.category?.name || "");
      setfilePreview(categoryData?.category?.featureImage || "");
    }
  }, [categoryData, setValue]);

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

      formData.append("name", data.name);

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/book-category/update/${category_id}`,
        formData,
        { withCredentials: true }
      );

      if (
        response.status === 200 ||
        response.data?.success ||
        response.data?.status
      ) {
        const responseData = response.data;

        showToast(
          "success",
          responseData.message || "Book Category updated successfully"
        );

        router.push("/bookstore");
      }
    } catch (error) {
      showToast(
        "error",
        error?.response?.data?.message || "Something went Wrong"
      );
    }
  };

  return (
    <Card className="max-w-xl mx-auto mt-10 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center text-gray-800">
          Update Book Category
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Category Name
            </label>

            <input
              type="text"
              placeholder="e.g., Artificial Intelligence"
              {...register("name")}
              className={`w-full px-3 py-2 border rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 transition-all ${
                errors.name
                  ? "border-destructive focus:ring-destructive/20"
                  : "border-gray-200 focus:border-primary focus:ring-primary/10"
              }`}
            />

            {errors.name && (
              <p className="text-xs text-destructive font-medium mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <Dropzone
              onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}
              multiple={false}
              accept={{
                "image/*": [],
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  className="flex flex-col w-36 cursor-pointer"
                >
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Feature Image
                  </label>

                  <input {...getInputProps()} />

                  <div className="flex justify-center items-center w-36 h-28 border-2 border-dashed relative rounded-md overflow-hidden bg-gray-50">
                    {filePreview ? (
                      <img
                        src={filePreview}
                        alt="Preview"
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

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 font-semibold"
          >
            {isSubmitting ? "Updating..." : "Update Book Category"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditBookCategory;