// src/helper/showToast.js
"use client";

import { toast, Bounce, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"; 

export const showToast = (type, message) => {
  const config = {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  };

  if (type === "success") {
    toast.success(message, config);
  } else if (type === "error") {
    toast.error(message, config);
  } else if (type === "info") {
    toast.info(message, config);
  } else {
    toast(message, config);
  }
};


export function GlobalToastContainer() {
  return <ToastContainer />;
}