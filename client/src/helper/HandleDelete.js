'use client';
import axios from "axios";

export const handleDelete = async (endpoint) => {
  const confirmDelete = confirm("Are you sure to delete this data?");
  if (!confirmDelete) return false;

  try {
    const response = await axios.delete(endpoint, { withCredentials: true });

    if (response.status >= 200 && response.status < 300) {
      return { 
        success: response.data?.status ?? true, 
        data: response.data 
      };
    }

    return { success: false, message: "Something went Wrong" };
  } catch (error) {
    console.error("Delete Error:", error);

    // 👈 Safe optional chaining to prevent 'reading message of undefined'
    const errorMessage = 
      error.response?.data?.message || 
      error.message || 
      "Server error!";

    return { 
      success: false, 
      message: errorMessage 
    };
  }
};