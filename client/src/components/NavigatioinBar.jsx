import React, { useState } from 'react'
// flowbite
import { Flowbite, Avatar } from "flowbite-react";
// animation 
import { color, motion } from "framer-motion"
// images
// avatar images
import avatar from '../assets/avatar1.jpg'
import avatar2 from '../assets/avatar2.jpg'
import avatar3 from '../assets/avatar3.jpg'
import avatar4 from '../assets/avatar4.jpg'
// icons section 
import { IoChatbubbleEllipsesOutline, IoNotificationsOutline} from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { MdAdd,MdOutlineExplore } from "react-icons/md";
import SearchComponent from './SearchComponent';
import NotificationComponent from './notificationComponent';



const NavigatioinBar = () => {
    const [isNotification, setIsNotification] = useState(true)

    const customTheme = {
        "Avatar": {
            "root": {
                "base": "flex items-center justify-center space-x-4 rounded",
                "bordered": "p-1 ring-2",
                "rounded": "rounded-full",
                "color": {
                    "dark": "ring-gray-800 dark:ring-gray-800",
                    "failure": "ring-red-500 dark:ring-red-700",
                    "gray": "ring-gray-500 dark:ring-gray-400",
                    "info": "ring-cyan-400 dark:ring-cyan-800",
                    "light": "ring-gray-300 dark:ring-gray-500",
                    "purple": "ring-purple-500 dark:ring-purple-600",
                    "success": "ring-green-500 dark:ring-green-500",
                    "warning": "ring-yellow-300 dark:ring-yellow-500",
                    "pink": "ring-pink-500 dark:ring-pink-500"
                },
                "img": {
                    "base": "rounded ",
                    "off": "relative overflow-hidden bg-gray-100 dark:bg-gray-600",
                    "on": "",
                    "placeholder": "absolute -bottom-1 h-auto w-auto text-gray-400"
                },
                "size": {
                    "xs": "h-6 w-6",
                    "sm": "h-8 w-8",
                    "md": "h-10 w-10",
                    "lg": "h-20 w-20",
                    "xl": "h-36 w-36"
                },
                "stacked": "ring-2 ring-gray-300 dark:ring-gray-500",
                "statusPosition": {
                    "bottom-left": "-bottom-1 -left-1",
                    "bottom-center": "-bottom-1",
                    "bottom-right": "-bottom-1 -right-1",
                    "top-left": "-left-1 -top-1",
                    "top-center": "-top-1",
                    "top-right": "-right-1 -top-1",
                    "center-right": "-right-1",
                    "center": "",
                    "center-left": "-left-1"
                },
                "status": {
                    "away": "bg-yellow-400",
                    "base": "absolute h-3.5 w-3.5 rounded-full border-2 border-white dark:border-gray-800",
                    "busy": "bg-red-400",
                    "offline": "bg-gray-400",
                    "online": "bg-green-400"
                },
                "initials": {
                    "text": "font-medium text-gray-600 dark:text-gray-300",
                    "base": "relative inline-flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-600"
                }
            },
            "group": {
                "base": "flex -space-x-4"
            },
            "groupCounter": {
                "base": "relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-xs font-medium text-white ring-2 ring-gray-300 hover:bg-gray-600 dark:ring-gray-500"
            }
        }
    }
    return (
        <Flowbite theme={{ theme: customTheme }}>
            <div className='absolute bottom-[.5rem] md:relative md:top-0 bg-slate-200 md:bg-transparent md:w-full px-[2rem] rounded-full md:rounded-none md:px-[3rem] py-2 md:py-4 md:gap-3 flex items-center justify-center md:justify-between border-b-2 border-solid'>
                <span className='hidden md:block'>connectify</span>
                {/* search section */}
                <SearchComponent visible={false} />
                {/* menu section  */}
                <div className='flex items-center gap-4'>
                    {/* home section for mobile */}
                    <AiOutlineHome className='block md:hidden text-[1.8rem]' />
                    {/* chat option */}
                    <IoChatbubbleEllipsesOutline className='text-[1.8rem] cursor-pointer' />
                    {/* create post option  */}
                    <motion.div
                        className="relative overflow-hidden hover:bg-slate-200 px-[.25rem] md:px-[.5rem] py-1 flex items-center justify-center rounded-full cursor-pointer">
                        <MdAdd className="text-[1.8rem]" />
                        <span className='hidden md:block'>Create</span>
                    </motion.div>
                    {/* explore page */}
                    <MdOutlineExplore className='md:hidden text-[1.8rem] cursor-pointer' />
                    {/* notification  */}
                    <NotificationComponent visible={false}/>
                    {/* <div className=' hidden md:block relative cursor-pointer'>
                        <div className={`${isNotification ? '' : 'hidden'} absolute top-0 right-0 p-[.4rem] bg-red-500 rounded-full text-[11px] flex items-center justify-center`}></div>
                        <IoNotificationsOutline className='text-[1.8rem]' />
                    </div> */}
                    {/* avatar */}
                    <Avatar img={avatar} rounded status="online" statusPosition="bottom-right" />
                </div>
            </div>
        </Flowbite>
    )
}

export default NavigatioinBar