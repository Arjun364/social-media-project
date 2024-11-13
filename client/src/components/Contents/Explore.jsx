import React from 'react'
import Post from './Post'

const Explore = () => {
  return (
    <div className='w-full h-full flex flex-col gap-3 px-6 py-4 overflow-x-hidden overflow-y-scroll'>
        Explore section
        {/* posts */}
        <Post/>
        <Post/>
    </div>
  )
}

export default Explore