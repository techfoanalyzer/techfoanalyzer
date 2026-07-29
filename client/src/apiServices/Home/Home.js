import axios from "axios";

export async function HomeData() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/blogs`,
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

