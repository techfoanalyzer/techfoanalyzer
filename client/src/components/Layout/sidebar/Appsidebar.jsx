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

const Appsidebar = ({ categoryData }) => {

  const { user, isLoggedIn ,isHydrated } = useUserStore();


  return (
    <Sidebar>
      <SidebarHeader className="bg-white flex">
        <Link href="/">
          <Image src={textlogo} alt="logo" className="w-55 p-2 mt-1.5" />
        </Link>
      </SidebarHeader>

      <SidebarContent className="bg-white md:mt-3">
  {/* Navigation Section */}
  <SidebarGroup>
    <SidebarMenu>
      {/* Home (Sab ke liye) */}
      <SidebarMenuItem>
        <Link href="/" className="w-full">
          <SidebarMenuButton className="flex items-center gap-3 w-full cursor-pointer group">
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 group-hover:scale-105 transition-transform">
              <CiHome className="text-lg" />
            </div>
            <span>Home</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>

      {/* Categories (Only Admin) */}
      {isHydrated && (user?.role === "admin" || user?.user?.role === "admin") && (
        <SidebarMenuItem>
          <Link href="/category" className="w-full">
            <SidebarMenuButton className="flex items-center gap-3 w-full cursor-pointer group">
              <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400 group-hover:scale-105 transition-transform">
                <BiCategoryAlt className="text-lg" />
              </div>
              <span>Categories</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      )}

      {/* Blogs (Only Admin) */}
      {isHydrated && (user?.role === "admin" || user?.user?.role === "admin") && (
        <SidebarMenuItem>
          <Link href="/blog" className="w-full">
            <SidebarMenuButton className="flex items-center gap-3 w-full cursor-pointer group">
              <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400 group-hover:scale-105 transition-transform">
                <LiaBlogSolid className="text-lg" />
              </div>
              <span>Blogs</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      )}

      {/* Comments (Logged-in User & Admin) */}
      {isHydrated && isLoggedIn && (
        <SidebarMenuItem>
          <Link href="/comments" className="w-full">
            <SidebarMenuButton className="flex items-center gap-3 w-full cursor-pointer group">
              <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                <FaRegComments className="text-lg" />
              </div>
              <span>Comments</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      )}

      {/* Users (Only Admin) */}
      {isHydrated && (user?.role === "admin" || user?.user?.role === "admin") && (
        <SidebarMenuItem>
          <Link href="/users" className="w-full">
            <SidebarMenuButton className="flex items-center gap-3 w-full cursor-pointer group">
              <div className="p-1.5 rounded-lg bg-sky-50 text-sky-600 dark:bg-sky-950/50 dark:text-sky-400 group-hover:scale-105 transition-transform">
                <PiUsersThreeLight className="text-lg" />
              </div>
              <span>Users</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      )}

      {/* Profile (Logged-in User & Admin) */}
      {isHydrated && isLoggedIn && (
        <SidebarMenuItem>
          <Link href="/profile" className="w-full">
            <SidebarMenuButton className="flex items-center gap-3 w-full cursor-pointer group">
              <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400 group-hover:scale-105 transition-transform">
                <FaRegUser className="text-lg" />
              </div>
              <span>Profile</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      )}

      <SidebarMenuItem>
  <Link href="/contact-us" className="w-full">
    <SidebarMenuButton className="flex items-center gap-3 w-full cursor-pointer group">
      <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 group-hover:scale-105 transition-transform">
        <LuMail className="text-lg" />
      </div>
      <span>Contact Us</span>
    </SidebarMenuButton>
  </Link>
</SidebarMenuItem>

      {/* About Us (Sab ke liye) */}
      <SidebarMenuItem>
        <Link href="/about-us" className="w-full">
          <SidebarMenuButton className="flex items-center gap-3 w-full cursor-pointer group">
            <div className="p-1.5 rounded-lg bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400 group-hover:scale-105 transition-transform">
              <LuInfo className="text-lg" />
            </div>
            <span>About Us</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>


        {/* Dynamic Categories */}
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarMenu>
            {categoryData?.categories?.length > 0 &&
              categoryData.categories.map((category) => (
                <SidebarMenuItem key={category._id}>
                  <Link href={`/blogs/${category.slug}`} className="w-full">
                    <SidebarMenuButton className="flex items-center gap-2 w-full cursor-pointer">
                      <MdKeyboardArrowRight className="text-base" />
                      <span>{category.name}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default Appsidebar;