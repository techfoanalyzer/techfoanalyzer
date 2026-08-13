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
import { LuSearchCheck, LuSearchX } from "react-icons/lu";
import { FiBookOpen } from "react-icons/fi";
import { showToast } from "@/helper/showToast";
import DictionaryModal from "@/components/common/DictionaryModal";

const Topbar = () => {
  const { user, isLoggedIn, isHydrated, removeUser } = useUserStore();
  const [showSearch, setshowSearch] = useState(false);
  const [isDictOpen, setIsDictOpen] = useState(false);
  const { toggleSidebar } = useSidebar();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`,
        { withCredentials: true }
      );

      if (response.data.success) {
        showToast("info", response.data.message || "Logged out successfully!");
      }
    } catch (error) {
      console.log(
        "Logout API error:",
        error?.response?.data?.message || error.message
      );
      showToast("info", "Logged out locally.");
    } finally {
      removeUser();
      router.replace("/");
    }
  };

  const toggleSearch = () => {
    setshowSearch(!showSearch);
  };

  return (
    <>
      <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-2.5 sm:px-5 transition-colors">
        {/* Left Side: Sidebar Toggle & Logo */}
        <div className="flex items-center gap-1.5 sm:gap-3 min-w-0 shrink">
          <button
            type="button"
            onClick={toggleSidebar}
            className="md:hidden p-1.5 shrink-0 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <RiMenuFold2Fill size={20} />
          </button>
          <Link href={"/"} className="w-28 xs:w-36 sm:w-44 md:w-52 flex items-center shrink">
            <img
              src={textlogo.src || textlogo}
              alt="Logo"
              className="w-full h-auto object-contain"
            />
          </Link>
        </div>

        {/* Center: Desktop Search Bar */}
        <div className="hidden md:block md:w-80 lg:w-[450px]">
          <SearchBox />
        </div>

        {/* Mobile Search Overlay Input */}
        <div
          className={`absolute left-0 w-full top-16 bg-white dark:bg-zinc-950 p-4 border-b border-zinc-200 dark:border-zinc-800 md:hidden transition-all ${
            showSearch ? "block" : "hidden"
          }`}
        >
          <SearchBox />
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Mobile Search Toggle Button */}
          <button
            onClick={toggleSearch}
            type="button"
            className="md:hidden p-1.5 sm:p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shrink-0"
          >
            {showSearch ? (
              <LuSearchX size={20} className="text-red-500" />
            ) : (
              <LuSearchCheck size={20} />
            )}
          </button>

          {/* Premium Tech Dictionary Button */}
          <button
            onClick={() => setIsDictOpen(true)}
            type="button"
            className="relative group flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200/80 dark:border-red-800/50 hover:bg-red-100 dark:hover:bg-red-900/60 hover:border-red-300 active:scale-95 transition-all duration-200 shadow-xs shrink-0"
            title="Tech & Urdu Dictionary"
          >
            {/* Soft Pulse Indicator Dot */}
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>

            {/* Icon with Hover Animation */}
            <FiBookOpen className="text-base group-hover:rotate-12 transition-transform duration-200 shrink-0" />

            {/* Label for Desktop */}
            <span className="hidden md:inline-block font-semibold text-xs tracking-wide">
              Dictionary
            </span>
          </button>

          {/* User Auth Section */}
          {!isHydrated ? (
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 animate-pulse shrink-0" />
          ) : !isLoggedIn ? (
            <Link href={"/sign-in"} className="shrink-0">
              <Button size="sm" className="rounded-full gap-1 font-medium px-2.5 sm:px-4 text-xs sm:text-sm h-8 sm:h-9">
                <PiSignIn className="text-sm sm:text-base shrink-0" />
                <span>Sign-In</span>
              </Button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none cursor-pointer rounded-full ring-offset-background transition-shadow focus-visible:ring-2 focus-visible:ring-ring shrink-0">
                <Avatar className="h-8 w-8 sm:h-9 sm:w-9 border border-zinc-200 dark:border-zinc-800">
                  <AvatarImage
                    src={user?.user?.avatar || userIcon}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold">
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
                    className="cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-50 dark:focus:bg-red-950/50"
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

      {/* Dictionary Modal */}
      <DictionaryModal
        isOpen={isDictOpen}
        onClose={() => setIsDictOpen(false)}
      />
    </>
  );
};

export default Topbar;