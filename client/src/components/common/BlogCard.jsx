import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { FaRegCalendarCheck } from "react-icons/fa";
import icon from "@/assets/images/placeHolder.png";
import moment from "moment";
import { MdVerified } from "react-icons/md";
import Link from "next/link";

const BlogCard = ({ props }) => {
  return (
    <Link href={`/blogs/${props?.category?.slug}/${props?.slug}`}>
      <Card className="pt-5">
        <CardContent>
          <div className="flex justify-between items-center mx-1">
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage 
                  src={props?.author?.avatar || icon} 
                  alt={props?.author?.name || "Author avatar"} 
                />
              </Avatar>
              <span>{props?.author?.name}</span>
            </div>
            {props?.author?.role === "admin" && (
              <MdVerified className="size-6 text-red-600" />
            )}
          </div>

          <div className="my-2">
            <img 
              src={props?.featureImage} 
              alt={props?.tittle || "Blog feature image"} 
              className="rounded aspect-video w-full object-cover" 
            />
          </div>

          <div className="mt-5">
            <p className="flex items-center gap-2 mb-2">
              <FaRegCalendarCheck />
              <span>{moment(props?.createdAt).format("DD-MMM-YYYY")}</span>
            </p>
            <h1 className="text-xl font-bold line-clamp-2">{props?.tittle}</h1>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;