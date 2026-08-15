"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import textlogo from "@/assets/images/textLogo.png";
import { CiHome } from "react-icons/ci";
import { BiCategoryAlt } from "react-icons/bi";
import { LiaBlogSolid } from "react-icons/lia";
import { FaRegComments } from "react-icons/fa6";
import { PiUsersThreeLight } from "react-icons/pi";
import Link from "next/link";
import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { LuInfo, LuMail } from "react-icons/lu";
import { useUserStore } from "@/store/userStore";
import { PiBookmarksFill } from "react-icons/pi";


const Appsidebar = ({ categoryData }) => {
  const { user, isLoggedIn, isHydrated } = useUserStore();
  const { setOpenMobile } = useSidebar();

  const handleLinkClick = () => {
    if (setOpenMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar className="border-r border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950">
      {/* Header / Logo */}
      <SidebarHeader className="px-5 py-3 md:py-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950">
        <Link 
          href="/" 
          onClick={handleLinkClick} 
          className="inline-block transition-transform duration-200 hover:scale-[1.02] active:scale-95"
        >
          <Image src={textlogo} alt="TechfoAnalyzer Logo" className="w-36 h-auto" priority />
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 space-y-3 overflow-y-auto bg-white dark:bg-slate-950">
        {/* Main Navigation Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase px-3 mb-2">
            Main Navigation
          </SidebarGroupLabel>

          <SidebarMenu className="space-y-2">
            {/* Home */}
            <SidebarMenuItem>
              <Link href="/" onClick={handleLinkClick} className="w-full">
                <SidebarMenuButton className="relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-900 transition-all duration-200 group overflow-hidden before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-1 before:bg-red-500 before:rounded-r-full before:opacity-0 hover:before:opacity-100 before:transition-all">
                  <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-200 shadow-xs">
                    <CiHome className="text-lg" />
                  </div>
                  <span className="font-medium text-sm group-hover:translate-x-0.5 transition-transform">Home</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            {/* Categories (Only Admin) */}
            {isHydrated && (user?.role === "admin" || user?.user?.role === "admin") && (
              <SidebarMenuItem>
                <Link href="/category" onClick={handleLinkClick} className="w-full">
                  <SidebarMenuButton className="relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-900 transition-all duration-200 group overflow-hidden before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-1 before:bg-red-500 before:rounded-r-full before:opacity-0 hover:before:opacity-100 before:transition-all">
                    <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-200 shadow-xs">
                      <BiCategoryAlt className="text-lg" />
                    </div>
                    <span className="font-medium text-sm group-hover:translate-x-0.5 transition-transform">Categories</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            )}

            {/* Blogs (Only Admin) */}
            {isHydrated && (user?.role === "admin" || user?.user?.role === "admin") && (
              <SidebarMenuItem>
                <Link href="/blog" onClick={handleLinkClick} className="w-full">
                  <SidebarMenuButton className="relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-900 transition-all duration-200 group overflow-hidden before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-1 before:bg-red-500 before:rounded-r-full before:opacity-0 hover:before:opacity-100 before:transition-all">
                    <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-200 shadow-xs">
                      <LiaBlogSolid className="text-lg" />
                    </div>
                    <span className="font-medium text-sm group-hover:translate-x-0.5 transition-transform">Blogs</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            )}

            {/* Comments (Logged-in User & Admin) */}
            {isHydrated && isLoggedIn && (
              <SidebarMenuItem>
                <Link href="/comments" onClick={handleLinkClick} className="w-full">
                  <SidebarMenuButton className="relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-900 transition-all duration-200 group overflow-hidden before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-1 before:bg-red-500 before:rounded-r-full before:opacity-0 hover:before:opacity-100 before:transition-all">
                    <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-200 shadow-xs">
                      <FaRegComments className="text-lg" />
                    </div>
                    <span className="font-medium text-sm group-hover:translate-x-0.5 transition-transform">Comments</span>
                  </SidebarMenuButton>
                </Link>
                 <Link href="/saved-blogs" onClick={handleLinkClick} className="w-full">
                  <SidebarMenuButton className="relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-900 transition-all duration-200 group overflow-hidden before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-1 before:bg-red-500 before:rounded-r-full before:opacity-0 hover:before:opacity-100 before:transition-all">
                    <div className="p-2 rounded-lg bg-red-50 dark:bg-emerald-950/50 text-red-400 dark:text-red-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-200 shadow-xs">
                      <PiBookmarksFill className="text-lg" />
                    </div>
                    <span className="font-medium text-sm group-hover:translate-x-0.5 transition-transform">My Library</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              
             )} 

            {/* Users (Only Admin) */}
            {isHydrated && (user?.role === "admin" || user?.user?.role === "admin") && (
              <SidebarMenuItem>
                <Link href="/users" onClick={handleLinkClick} className="w-full">
                  <SidebarMenuButton className="relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-900 transition-all duration-200 group overflow-hidden before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-1 before:bg-red-500 before:rounded-r-full before:opacity-0 hover:before:opacity-100 before:transition-all">
                    <div className="p-2 rounded-lg bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-200 shadow-xs">
                      <PiUsersThreeLight className="text-lg" />
                    </div>
                    <span className="font-medium text-sm group-hover:translate-x-0.5 transition-transform">Users</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            )}

            {/* Profile (Logged-in User & Admin) */}
            {isHydrated && isLoggedIn && (
              <SidebarMenuItem>
                <Link href="/profile" onClick={handleLinkClick} className="w-full">
                  <SidebarMenuButton className="relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-900 transition-all duration-200 group overflow-hidden before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-1 before:bg-red-500 before:rounded-r-full before:opacity-0 hover:before:opacity-100 before:transition-all">
                    <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-200 shadow-xs">
                      <FaRegUser className="text-lg" />
                    </div>
                    <span className="font-medium text-sm group-hover:translate-x-0.5 transition-transform">Profile</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            )}

            {/* Contact Us */}
            <SidebarMenuItem>
              <Link href="/contact-us" onClick={handleLinkClick} className="w-full">
                <SidebarMenuButton className="relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-900 transition-all duration-200 group overflow-hidden before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-1 before:bg-red-500 before:rounded-r-full before:opacity-0 hover:before:opacity-100 before:transition-all">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-200 shadow-xs">
                    <LuMail className="text-lg" />
                  </div>
                  <span className="font-medium text-sm group-hover:translate-x-0.5 transition-transform">Contact Us</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            {/* About Us */}
            <SidebarMenuItem>
              <Link href="/about-us" onClick={handleLinkClick} className="w-full">
                <SidebarMenuButton className="relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-900 transition-all duration-200 group overflow-hidden before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-1 before:bg-red-500 before:rounded-r-full before:opacity-0 hover:before:opacity-100 before:transition-all">
                  <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-200 shadow-xs">
                    <LuInfo className="text-lg" />
                  </div>
                  <span className="font-medium text-sm group-hover:translate-x-0.5 transition-transform">About Us</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Dynamic Categories Section */}
        {categoryData?.categories?.length > 0 && (
          <SidebarGroup className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <SidebarGroupLabel className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase px-3 mb-2 flex items-center gap-1.5">
              <BiCategoryAlt className="text-xs text-red-500" />
              <span>Explore Categories</span>
            </SidebarGroupLabel>

            <SidebarMenu className="space-y-1">
              {categoryData.categories.map((category) => (
                <SidebarMenuItem key={category._id}>
                  <Link href={`/blogs/${category.slug}`} onClick={handleLinkClick} className="w-full">
                    <SidebarMenuButton className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/60 dark:hover:bg-slate-900 transition-all duration-150 group">
                      <span className="text-sm font-normal truncate group-hover:translate-x-1 transition-transform">{category.name}</span>
                      <MdKeyboardArrowRight className="text-base text-slate-400 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
};

export default Appsidebar;