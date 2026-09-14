"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { showToast } from "@/helper/showToast";
import { useRouter } from "next/navigation";
import Dropzone from "react-dropzone";
import { PiUpload } from "react-icons/pi";

const AddBookCategory = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [filePreview, setfilePreview] = useState();
  const [file, setfile] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileSelection = async (files) => {
    const selectedFile = files[0];

    if (selectedFile) {
      const preview = URL.createObjectURL(selectedFile);
      setfile(selectedFile);
      setfilePreview(preview);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      showToast("error", "Category name is required");
      return;
    }

    if (name.trim().length < 3) {
      showToast("error", "Category name must be at least 3 characters long");
      return;
    }

    if (name.trim().length > 50) {
      showToast("error", "Category name can be a maximum of 50 characters long");
      return;
    }

    if (!file) {
      showToast("error", "Featured image is required");
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();

      formData.append("file", file);
      formData.append("name", name.trim());

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/book-category/create/`,
        formData,
        { withCredentials: true }
      );

      if (response.status === 201) {
        showToast("success", response.data.message);
        setName("");
        setfile(null);
        setfilePreview(null);
        router.push("/bookstore");
      }
    } catch (error) {
      showToast(
        "error",
        error?.response?.data?.message || "Something went Wrong"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-xl mx-auto mt-10 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center text-gray-800">
          Create New Book Category
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Category Name
            </label>

            <input
              type="text"
              placeholder="e.g., Artificial Intelligence"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary/10 transition-all"
            />
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
                    Featured Image
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
            {isSubmitting ? "Submitting..." : "Submit Data"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddBookCategory;