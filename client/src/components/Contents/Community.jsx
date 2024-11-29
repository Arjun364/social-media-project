import React, { useState } from 'react'
// flowbite
import { Avatar, Dropdown } from "flowbite-react";
// images
import bannerImg from '../../assets/lockscren.jpg'
// icons
import avatar4 from '../../assets/avatar4.jpg'
import avatar from '../../assets/avatar2.jpg'
import avatar3 from '../../assets/avatar3.jpg'
import { MdAdd } from "react-icons/md";
import { FaPenAlt } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { IoNotificationsOutline,IoEarthOutline } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
// components
import Post from './Post';


const Community = () => {
    const [menu,setMenu] =useState(false)
    const moderators =[
        {username:"arjun",img:avatar},
        {username:"jinu",img:avatar4},
        {username:"charly",img:avatar3},
        {username:"kannan",img:avatar}
    ]
    return (
        <div className='w-full h-full flex flex-col gap-3 md:px-[2rem] lx:px-[8rem] py-4 overflow-x-hidden overflow-y-scroll'>
            {/* header section */}
            <div className='w-full'>
                <div className={`w-full h-[10rem] rounded-md relative bg-cover bg-center bg-no-repeat`} style={{ backgroundImage: `url(${bannerImg})` }}>
                    <div className='absolute bottom-[-4rem] left-[.5rem] md:left-[3rem] flex items-end '>
                        <img src={avatar4} alt="community icon" className=' border-[.5rem] border-solid border-white w-[8rem] h-[8rem] rounded-full' />
                        <h5 className='pb-6'>Community name</h5>
                    </div>
                </div>
                {/* community menu section */}
                <div className='w-full h-[3rem] px-5 flex items-center justify-end '>
                    <div className='hidden lg:flex items-center justify-end gap-4'>
                        <button className='btn4'><MdAdd className='text-[1.2rem]' />Create Post</button>
                        <button className='btn5'>Join</button>
                        {/* <BsThreeDots className='text-[1.5rem]' /> */}
                    </div>
                    {/*  */}

                    <div className='relative lg:hidden'>
                        <HiDotsHorizontal className=' text-[1.5rem]' onClick={()=>setMenu(!menu)} />
                        <div className={`${menu?'':'hidden'} absolute top-[1.5rem] right-0 w-[10rem] flex flex-col items-start gap-1 bg-white dark:bg-slate-600 rounded-md px-2 py-3`}>
                            <button className='btn4'><MdAdd className='text-[1.2rem]' />Create Post</button>
                            <button className='btn5'>Join</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* community posts */}
            <div className='w-full px-[2rem] flex gap-3'>
                {/* posts */}
                <div className='flex-1 flex flex-col'>
                    {/* <Post/> */}
                </div>
                {/* community description */}
                <div className='hidden lg:flex flex-col w-[20rem] h-[40rem] bg-slate-300 dark:bg-slate-500 rounded-md px-[1rem] py-2'>
                    {/* about the community */}
                    <div className='w-full flex flex-col gap-3 pb-3 border-b-2 border-solid '>
                        <div className='w-full flex flex-col gap-2'>
                        <span className='text-[.9rem] font-semibold'>Community heading or title</span>
                        <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia culpa tenetur incidunt animi tempore molestiae eaque repellat laborum, consequatur exercitationem deserunt sapiente sed autem temporibus qui officia quaerat expedita adipisci.</p>
                        <span className='flex gap-2 text-sm items-center'><FaPenAlt /> created jan 26</span>
                        <span className='flex gap-2 text-sm items-center'><IoEarthOutline /> public</span>
                        <div className='w-full grid grid-cols-2'>
                            <div className='flex flex-col'>
                                34M
                                <span className='text-sm text-slate-700'>Members</span>
                            </div>
                            <div className='flex flex-col'>
                                3K
                                <span className='text-sm text-slate-700 flex items-center gap-1'><div className='w-[.6rem] h-[.6rem] bg-green-500 rounded-full'></div>Online</span>
                            </div>
                        </div>
                        </div>
                    </div>
                    {/* moderators */}
                    <div className='w-full'>
                        <span className='font-medium'>Moderators</span>
                        <div className='w-full flex flex-col'>
                            {/* users */}
                            {moderators.map((users)=>(
                            <div id={users.id} className='w-full px-2 py-1 flex items-center gap-1 cursor-pointer rounded-md'>
                                <img src={users.img} alt="avatar" className='w-[2.5rem] h-[2.5rem] rounded-full' />
                                <span className='text-sm'>u/{users.username}</span>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Community