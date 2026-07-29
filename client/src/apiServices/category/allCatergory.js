import axios from "axios";

export async function getCategory() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/category/all-category`,
      {
        withCredentials: true,
      }
    );
    return response.data; 
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null; 
  }
}


export async function getBlogByCategory(category) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/get-blog-by-category/${category}`
    );

    if (response.data?.success) {
      return response.data; 
    }
    return null;
  } catch (error) {
    console.error(
      "Error fetching blogs by category:",
      error?.response?.data?.message || error.message
    );
    return null;
  }
}