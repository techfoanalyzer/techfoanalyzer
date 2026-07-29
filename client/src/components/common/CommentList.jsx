// 'use client'

// import { useAxios } from "@/helper/useAxios";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import icon from "@/assets/images/placeHolder.png";
// import moment from "moment";

// const axiosOptions = { withCredentials: true };


// const CommentList = ({ props }) => {

  
//   const {
//     data: commentData,
//     loading,
//     error,
//   } = useAxios(
//     `${process.env.NEXT_PUBLIC_API_BASE_URL}/comment/get/${props.blogid}`,
//     axiosOptions, [props.callComment]
//   );
  
//   return (
//     <div>
//       <h4 className="text-xl font-bold py-3 ">
//         {commentData && commentData.comments.length} <span />
//         Comment
//       </h4>

//       <div className="mt-5">
//         {commentData &&
//           commentData.comments.length > 0 &&
//           commentData.comments.map((comment) => {
//             return (
//               <div className="flex mb-6 gap-3" key={comment._id}>
               
//                  <Avatar className='mt-2'>
//                   <AvatarImage src={comment?.user?.avatar || icon} />
//                 </Avatar>
//                 <div>
//                   <h4 className="font-bold">{comment?.user.name}</h4>
//                   <p className="text-xs">{moment(comment?.createdAt).format("DD-MMMM-YYYY")}</p>
//                   <div className="mt-2" ><p className=" bg-[#F5F5F5] px-3 py-2 rounded ">
//                     {comment?.comment}</p></div>
//                 </div>
//               </div>
//             );
//           })}
//       </div>
//     </div>
//   );
// };

// export default CommentList;

'use client';

import { useState } from "react";
import { useAxios } from "@/helper/useAxios";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import icon from "@/assets/images/placeHolder.png";
import moment from "moment";

const axiosOptions = { withCredentials: true };

const CommentList = ({ props }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    data: commentData,
    loading,
    error,
  } = useAxios(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/comment/get/${props.blogid}`,
    axiosOptions, 
    [props.callComment]
  );
  
  const comments = commentData?.comments || [];

  // Pehle 3 comments, ya expanded state par saare comments
  const visibleComments = isExpanded ? comments : comments.slice(0, 3);

  return (
    <div>
      <h4 className="text-xl font-bold py-3">
        {comments.length} Comments
      </h4>

      <div className="mt-5">
        {visibleComments.length > 0 &&
          visibleComments.map((comment) => {
            return (
              <div className="flex mb-6 gap-3" key={comment._id}>
                <Avatar className="mt-2">
                  <AvatarImage src={comment?.user?.avatar || icon} />
                </Avatar>
                <div>
                  <h4 className="font-bold">{comment?.user?.name}</h4>
                  <p className="text-xs">
                    {moment(comment?.createdAt).format("DD-MMMM-YYYY")}
                  </p>
                  <div className="mt-2">
                    <p className="bg-[#F5F5F5] px-3 py-2 rounded">
                      {comment?.comment}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

        {/* See More / Show Less Button Fix */}
        {comments.length > 3 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm font-semibold text-red-600 hover:underline mt-2 cursor-pointer focus:outline-none"
          >
            {isExpanded 
              ? "Show Less" 
              : `See More (${comments.length - 3} more comments)`
            }
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentList;