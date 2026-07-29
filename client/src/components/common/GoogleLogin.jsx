'use client'
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { Auth, provider } from "@/helper/FireBase";
import axios from "axios";
import { useUserStore } from "@/store/userStore";

import { showToast } from "@/helper/showToast";
import { useRouter } from "next/navigation";


const GoogleLogin = () => {

  const { setUser } = useUserStore();
 const router =  useRouter()



  const handleLogin = async () => {
    const googleResponse = await signInWithPopup(Auth, provider);
    const user = googleResponse.user;
    
    const bodyData = {
      name: user.displayName,
      email: user.email,
      avatar: user.photoURL,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google-login`,
        bodyData,
        { withCredentials: true },
      );

      if (response.status === 200) {
        const data = response.data;
        setUser(data)
        router.push('/')
      showToast("success", data.message || "Successfully user Login");

        
      }
    } catch (apiError) {
      console.error("API Error:", apiError);
      const error = apiError.response?.data?.message || "Something went wrong";
      showToast("error", error);
    }
  };
  return (
    <Button variant="outline" className="w-full" onClick={handleLogin}>
      <FcGoogle />
      Continue With Google
    </Button>
  );
};

export default GoogleLogin;
