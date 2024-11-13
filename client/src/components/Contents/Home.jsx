import React from 'react'
import Post from './Post'

const Home = () => {
  return (
    <div className='w-full h-full flex flex-col gap-3 px-6 py-4 overflow-x-hidden overflow-y-scroll'>
        Home section
        {/* posts */}
        <Post/>
        <Post/>
    </div>
  )
}

export default Home