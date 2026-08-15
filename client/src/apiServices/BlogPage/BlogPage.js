import axios from "axios";

export async function BlogPage(slug) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/get-blog/${slug}`
    );
    
    if (response.data?.success) {
      return response.data; 
    }
    return null;
  } catch (error) {
    console.error("Error fetching blog details:", error?.response?.data?.message || error.message);
    return null;
  }
}


export async function RelatedBlog(category, slug) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/get-related-blog/${category}/${slug}`
    );

    if (response.data?.success) {
      return response.data; 
    }
    return [];
  } catch (error) {
    console.error(
      "Error fetching related blogs:",
      error?.response?.data?.message || error.message
    );
    return [];
  }
}



