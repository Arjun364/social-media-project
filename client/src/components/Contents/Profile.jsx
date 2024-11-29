import React, { useState } from 'react'
// avatars
import avatar from '../../assets/avatar2.jpg'
import { Link, Outlet } from 'react-router-dom'
// import avatar2 from '../assets/avatar2.jpg'
// import avatar3 from '../assets/avatar3.jpg'
// import avatar4 from '../assets/avatar4.jpg'

// icons
import { IoAddOutline } from "react-icons/io5";
// banner image
import imgbanner from '../../assets/chainsawman2.jpg'

const Profile = ({ userCreditials }) => {
  const [tab, setTab] = useState('post')
  console.log(userCreditials);

  return (
    <div className='w-full h-full flex gap-3 md:px-[2rem] lx:px-[8rem] py-4 overflow-x-hidden overflow-y-scroll'>
      {/* left section */}
      <div className=' h-full flex-1 flex flex-col gap-3 px-[2rem] py-[1rem]'>
        {/* profile photo and userid */}
        <div className='w-full flex items-center gap-2'>
          <img src={userCreditials.userImg || avatar} alt="profile section" className='w-[8rem] h-[8rem] rounded-full' />
          <div className='flex flex-col'>
            <h3 className='leading-[1.4rem] flex items-center gap-2'>{userCreditials.username || "username"} {userCreditials.role == "admin" ? <div className='bg-red-500 rounded-full flex items-center justify-center text-white text-sm py-1 px-2'>admin</div> : ""}</h3>
            <span className={`${userCreditials.role == "admin" ? "text-red-500" : "text-slate-600"}`}>{userCreditials.role == "admin" ? "a" : "u"}/{userCreditials.username}</span>
          </div>
        </div>
        {/* tab section */}
        <div className="w-full flex items-center dark:bg-gray-800 dark:text-white border-b-2 border-solid dark:border-slate-400">
          <Link rel="noopener noreferrer" to="/viewProfile/post" className={`px-5 py-1 border-b-2 border-solid ${tab === "post" ? 'border-black dark:border-white' : 'border-transparent'} `} onClick={() => setTab("post")}>Post</Link>
          <Link rel="noopener noreferrer" to="/viewProfile/comments" className={`px-5 py-1 border-b-2 ${tab === "comments" ? 'border-black dark:border-white' : 'border-transparent'}`} onClick={() => setTab("comments")}>comments</Link>
          <Link rel="noopener noreferrer" to="/viewProfile/saved" className={`px-5 py-1 border-b-2 ${tab === "saved" ? 'border-black dark:border-white' : 'border-transparent'}`} onClick={() => setTab("saved")}>saved</Link>
        </div>
        {/* the content section  */}
        <Outlet  />
      </div>
      {/* right section */}
      <div className='bg-slate-100 dark:bg-slate-900 h-full w-[20rem] rounded-md overflow-x-hidden overflow-y-scroll hidden flex-col  xl:flex'>
        <img src={userCreditials.imgbanner} alt="banner" />
        <div className='px-2 flex flex-col gap-2'>
          <h3>{userCreditials.username}</h3>
          {/* info  */}
          <div className='w-full grid grid-cols-2 gap-2 *:text-base'>
            <div className='flex flex-col'>{userCreditials.post.length}<span className='text-slate-600 dark:text-slate-400 text-[.8rem]'>Post Karma</span></div>
            <div className='flex flex-col'>0<span className='text-slate-600 dark:text-slate-400 text-[.8rem]'>Comment Karma</span></div>
            <div className='flex flex-col'>Apr 19 2023<span className='text-slate-600 dark:text-slate-400 text-[.8rem]'>Cake Day</span></div>
          </div>
          {/* links */}
          <hr className='w-full h-[.1rem] border-0 bg-slate-300' />
          <span className='text-sm font-semibold text-slate-500'>links</span>
          <div className='w-full '>
            <div className='w-full h-[2.5rem] bg-white dark:bg-slate-600 hover:bg-slate-200 cursor-pointer rounded-md flex items-center px-2'>
              <IoAddOutline className='text-[1.7rem]' />
              Add links
            </div>
          </div>
          <hr className='w-full h-[.1rem] border-0 bg-slate-300' />
          {/* settings */}
          <span className='text-sm font-semibold text-slate-500'>Settings</span>
          {/* option */}
          <div class="flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm">
            {/* <!-- Profile Section --> */}
            <div class="flex items-center space-x-4">
              {/* <!-- Avatar --> */}
              <img src={userCreditials.userImg} alt="Profile Avatar" class="w-10 h-10 rounded-full"/>
              {/* <!-- Profile Text --> */}
              <div>
                <h3 class="text-[16px] font-semibold text-gray-800">Profile</h3>
                <p class="text-[10px] text-gray-500">Customize your profile</p>
              </div>
            </div>

            {/* <!-- Edit Profile Button --> */}
            <button
              class="px-4 py-2 text-[10px] font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile