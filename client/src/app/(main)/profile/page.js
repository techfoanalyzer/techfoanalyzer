import UserGuard from "@/components/common/UserGuard";
import Profile from "@/pages/Profile/profile";
import React from "react";

const profilePage = () => {
  return (
    <UserGuard>
      <div>
        <Profile />
      </div>
    </UserGuard>
  );
};

export default profilePage;
