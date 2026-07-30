"use client";

import textlogo from "@/assets/images/textLogo.png";
import { Button } from "@/components/ui/button";
import { PiSignIn } from "react-icons/pi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import userIcon from "@/assets/images/placeHolder.png";
import { FaRegUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { RiLogoutBoxLine } from "react-icons/ri";
import Link from "next/link";
import SearchBox from "../../common/SearchBox";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSidebar } from "@/components/ui/sidebar";
import { useState } from "react";
import { RiMenuFold2Fill } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import { TbWorldSearch } from "react-icons/tb";
import { LuSearchCheck } from "react-icons/lu";
import { LuSearchX } from "react-icons/lu";
import { showToast } from "@/helper/showToast";

const Topbar = () => {
  const { user, isLoggedIn, isHydrated, removeUser } = useUserStore();
  const [showSearch, setshowSearch] = useState(false);
  const { toggleSidebar } = useSidebar();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`,
        { withCredentials: true },
      );

      if (response.data.success) {
        const data = response.data;
        removeUser();
        showToast("info", data.message);
        router.replace("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleSearch = () => {
    setshowSearch(!showSearch);
  };

  return (
    <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white border-b px-3 sm:px-5">
  <div className="flex items-center gap-2 sm:gap-3">
    <button type="button" onClick={toggleSidebar} className="md:hidden">
      <RiMenuFold2Fill size={20} />
    </button>
    <Link href={"/"} className="w-32 sm:w-44 md:w-52">
      <img
        src={textlogo.src || textlogo}
        alt="Logo"
        className="w-full h-auto object-contain"
      />
    </Link>
  </div>


  <div className="hidden md:block md:w-80 lg:w-[450px]">
    <SearchBox />
  </div>


  <div
    className={`absolute left-0 w-full top-16 bg-white p-4 border-b md:hidden ${
      showSearch ? "block" : "hidden"
    }`}
  >
    <SearchBox />
  </div>

  <div className="flex items-center gap-2 sm:gap-4">
    <button
      onClick={toggleSearch}
      type="button"
      className="md:hidden block"
    >
      {showSearch ? <LuSearchX size={22} className="text-red-500" /> : <LuSearchCheck size={22} />}
    </button>

    {!isHydrated ? (
      <div className="w-10 h-10" /> 
    ) : !isLoggedIn ? (
      <Link
        href={"/sign-in"}
        className="flex justify-center items-center gap-1"
      >
        <Button className="rounded-full">
          <PiSignIn />
          Sign-In
        </Button>
      </Link>
    ) : (
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none cursor-pointer">
          <Avatar>
            <AvatarImage
              src={user?.user?.avatar || userIcon}
              className="object-cover"
            />
            <AvatarFallback>
              {user?.user?.name?.charAt(0).toUpperCase() || "TA"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="flex flex-col gap-0.5 font-normal">
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">
                {user?.user?.name}
              </p>
              <p
                className="text-xs text-zinc-500 dark:text-zinc-400 truncate"
                title={user?.user?.email}
              >
                {user?.user?.email}
              </p>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <Link href={"/profile"}>
              <DropdownMenuItem className="cursor-pointer">
                <FaRegUser className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
            </Link>

            {user?.user?.role === "admin" && (
              <Link href={"/blog/create"}>
                <DropdownMenuItem className="cursor-pointer">
                  <FaPlus className="mr-2 h-4 w-4" />
                  <span>Create Blog</span>
                </DropdownMenuItem>
              </Link>
            )}

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="cursor-pointer text-red-500 focus:text-red-500"
              onClick={handleLogout}
            >
              <RiLogoutBoxLine className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )}
  </div>
</div>
  );
};

export default Topbar;
