'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { Auth, provider } from "@/helper/FireBase";
import axios from "axios";
import { useUserStore } from "@/store/userStore";
import { showToast } from "@/helper/showToast";
import { useRouter } from "next/navigation";

const GoogleLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useUserStore();
  const router = useRouter();

  const handleLogin = async () => {
    if (loading) return; // Stop parallel execution
    setLoading(true);

    try {
      // 1. Firebase Popup Call Inside Try-Catch
      const googleResponse = await signInWithPopup(Auth, provider);
      const user = googleResponse.user;

      const bodyData = {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };

      // 2. Backend Sync Call
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google-login`,
        bodyData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        const data = response.data;
        setUser(data);
        showToast("success", data.message || "Successfully logged in");
        router.push("/");
      }
    } catch (error) {
      // 3. Gracefully Handle Firebase Cancelled Popup Errors
      if (error.code === "auth/cancelled-popup-request") {
        console.warn("Google Sign-In popup request was cancelled.");
      } else if (error.code === "auth/popup-closed-by-user") {
        showToast("info", "Google Sign-In popup was closed.");
      } else {
        console.error("Authentication / API Error:", error);
        const errorMessage =
          error.response?.data?.message || error.message || "Something went wrong";
        showToast("error", errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      type="button" 
      variant="outline" 
      className="w-full" 
      onClick={handleLogin}
      disabled={loading}
    >
      <FcGoogle />
      {loading ? "Connecting..." : "Continue With Google"}
    </Button>
  );
};

export default GoogleLogin;


// 'use client'
// import { Button } from "@/components/ui/button";
// import { FcGoogle } from "react-icons/fc";
// import { signInWithPopup } from "firebase/auth";
// import { Auth, provider } from "@/helper/FireBase";
// import axios from "axios";
// import { useUserStore } from "@/store/userStore";

// import { showToast } from "@/helper/showToast";
// import { useRouter } from "next/navigation";


// const GoogleLogin = () => {

//   const { setUser } = useUserStore();
//  const router =  useRouter()



//   const handleLogin = async () => {
//     const googleResponse = await signInWithPopup(Auth, provider);
//     const user = googleResponse.user;
    
//     const bodyData = {
//       name: user.displayName,
//       email: user.email,
//       avatar: user.photoURL,
//     };

//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google-login`,
//         bodyData,
//         { withCredentials: true },
//       );

//       if (response.status === 200) {
//         const data = response.data;
//         setUser(data)
//         router.push('/')
//       showToast("success", data.message || "Successfully user Login");

        
//       }
//     } catch (apiError) {
//       console.error("API Error:", apiError);
//       const error = apiError.response?.data?.message || "Something went wrong";
//       showToast("error", error);
//     }
//   };
//   return (
//     <Button variant="outline" className="w-full" onClick={handleLogin}>
//       <FcGoogle />
//       Continue With Google
//     </Button>
//   );
// };

// export default GoogleLogin;
