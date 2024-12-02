import React from 'react'
import Post from './Post'

const Home = ({ userCreditials}) => {
  return (
    <div className='w-full h-full flex flex-col gap-3 px-6 py-4 overflow-x-hidden overflow-y-scroll'>
      {/* posts */}
      {userCreditials.home.map((post)=>(
      <Post key={post.id} postdata={post} userCreditials={userCreditials}/>
      ))}
    </div>
  )
}

export default Home