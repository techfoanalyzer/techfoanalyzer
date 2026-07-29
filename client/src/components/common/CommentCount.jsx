'use client'
import { useAxios } from '@/helper/useAxios';
import { FaRegComment } from "react-icons/fa";

const axiosOptions = { withCredentials: true };

const CommentCount = ({props}) => {
      const {
        data: commentData,
        loading,
        error,
      } = useAxios(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/comment/get-count/${props.blogid}`,
        axiosOptions
      );
    

  return (
    <button type='button' className='flex justify-between items-center gap-2'>
        <FaRegComment />
        {commentData && commentData.commentCount}
    </button>
  )
}

export default CommentCount