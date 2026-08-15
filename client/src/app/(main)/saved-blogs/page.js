import { savedBlogs } from '@/apiServices/BlogPage/BlogPage'
import UserGuard from '@/components/common/UserGuard'
import SavedBlog from '@/pages/SavedBlog/SavedBlog'
import React from 'react'

const savedblogs = () => {
    
  return (

    <UserGuard>
        <div>
            <SavedBlog/>
        </div>

    </UserGuard>
  )
}

export default savedblogs