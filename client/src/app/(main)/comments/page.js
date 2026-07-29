import UserGuard from '@/components/common/UserGuard'
import CommentDetails from '@/pages/Comment/CommentDetails'
import React from 'react'

const allComments = () => {
  return (
   <UserGuard>
     <div>
        <CommentDetails/>
    </div>
   </UserGuard>
  )
}

export default allComments