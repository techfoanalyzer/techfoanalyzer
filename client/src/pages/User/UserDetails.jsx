"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaRegTrashCan } from "react-icons/fa6";
import { handleDelete } from "@/helper/HandleDelete";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
import { useAxios } from "@/helper/useAxios";
import { showToast } from "@/helper/showToast";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import imageIcon from "@/assets/images/placeHolder.png";
import Image from "next/image";

const axiosOptions = { withCredentials: true };

const UserDetails = () => {
  const [refresh, setrefresh] = useState(false);
  const {
    data: userData,
    loading,
    error,
  } = useAxios(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/get-all-users`,
    axiosOptions,
    [refresh],
  );

  const handledelete = async (id) => {
    const response = await handleDelete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/delete-user/${id}`,
    );
    setrefresh(!refresh);
    if (response) {
      showToast("success", response.data.message);
    } else {
      showToast("error", "Category Not Deleted");
    }
  };

  return (
    <div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="font-extrabold">
                <TableHead>Role</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>UserId</TableHead>
                <TableHead>Avatar</TableHead>
                <TableHead>Dated</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userData && userData.users.length > 0 ? (
                userData.users.map((user) => (
                  <TableRow key={user?._id}>
                    <TableCell>{user?.role}</TableCell>
                    <TableCell>{user?.name}</TableCell>
                    <TableCell>{user?.email}</TableCell>
                    <TableCell>{user?._id}</TableCell>
                    <TableCell>
                      {
                        <Avatar>
                          <AvatarImage
                            src={
                              user?.avatar?.startsWith("http")
                                ? user?.avatar
                                : `${process.env.NEXT_PUBLIC_API_BASE_URL}/${user?.avatar?.replace(/^\//, "")}`
                            }
                            alt={user?.name || "User Avatar"}
                          />
                          <AvatarFallback className="uppercase">
                            {user?.name?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                      }
                    </TableCell>
                    <TableCell>
                      <div>

                      {moment(user?.createdAt).format("DD-MMMM-YYYY")}
                      </div>
                      <div>

                      {moment(user?.createdAt).format("h:mm a")}
                      </div>
                    </TableCell>
                    <TableCell className="flex gap-3">
                      <Button
                        onClick={() => handledelete(user._id)}
                        variant="outline"
                        className="hover:bg-red-600 hover:text-white"
                        size="icon"
                      >
                        <FaRegTrashCan />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="3">Data Not Found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetails;
