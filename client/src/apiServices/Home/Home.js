
export async function HomeData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/blogs`,
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


















// import axios from "axios";

// export async function HomeData() {
//   try {
//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/blogs`,
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

