export async function getCategory() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/category/all-category`,
      {
        next: { revalidate: 60 },
        credentials: "include", 
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error?.message);
    return null;
  }
}

export async function getBlogByCategory(category) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/get-blog-by-category/${category}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) return null;

    const data = await res.json();

    if (data?.success) {
      return data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching blogs by category:", error?.message);
    return null;
  }
}




















// import axios from "axios";

// export async function getCategory() {
//   try {
//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/category/all-category`,
//       {
//         withCredentials: true,
//       }
//     );
//     return response.data; 
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     return null; 
//   }
// }


// export async function getBlogByCategory(category) {
//   try {
//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/get-blog-by-category/${category}`
//     );

//     if (response.data?.success) {
//       return response.data; 
//     }
//     return null;
//   } catch (error) {
//     console.error(
//       "Error fetching blogs by category:",
//       error?.response?.data?.message || error.message
//     );
//     return null;
//   }
// }