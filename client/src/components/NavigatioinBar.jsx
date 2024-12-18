import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

// flowbite
import { Flowbite } from "flowbite-react";
// animation 
import { color, motion } from "framer-motion"
// images
// avatar images
import appicon from '../assets/icons.png'
// icons section 
import { IoChatbubbleEllipsesOutline, IoNotificationsOutline} from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import { MdAdd,MdOutlineExplore } from "react-icons/md";
import SearchComponent from './SearchComponent';
import NotificationComponent from './NotificationComponent';
import DarkModeSwitcher from './DarkModeSwitcher';
import ProfileIcon from './ProfileIcon';





const NavigatioinBar = ({isSection}) => {
    const [isNotification, setIsNotification] = useState(true)


    const navigate = useNavigate()
    const handleNavigation =(navigateto)=>{
        isSection(navigateto)
        navigate(`/${navigateto}`)
    }


    return (
        <Flowbite >
            <div className='absolute bottom-[.5rem] z-50 md:relative md:top-0 bg-slate-200 dark:bg-gray-800 md:bg-transparent md:w-full px-[2rem] rounded-full md:rounded-none md:px-[2.5rem] py-2 md:py-4 md:gap-3 flex items-center justify-center md:justify-between border-b-2 border-solid'>
                <span className='hidden md:flex items-center gap-1 text-[1.2rem] font-mono font-bold' ><img src={appicon} className='w-[2rem]' alt="connectify" /> connectify</span>
                {/* search section */}
                <SearchComponent visible={false} />
                {/* menu section  */}
                <div className='flex items-center gap-4'>
                    {/* home section for mobile */}
                    <AiOutlineHome className='block md:hidden text-[1.8rem]' onClick={()=>handleNavigation('home')} />
                    {/* chat option */}
                    <IoChatbubbleEllipsesOutline className='text-[1.8rem] cursor-pointer' onClick={()=>handleNavigation('message')}/>
                    {/* create post option  */}
                    <motion.div
                        className="relative overflow-hidden hover:bg-slate-200 px-[.25rem] md:px-[.5rem] py-1 flex items-center justify-center rounded-full cursor-pointer" onClick={()=>handleNavigation('createpost')}>
                        <MdAdd className="text-[1.8rem]" />
                        <span className='hidden md:block'>Create</span>
                    </motion.div>
                    {/* explore page */}
                    <MdOutlineExplore className='md:hidden text-[1.8rem] cursor-pointer' onClick={()=>handleNavigation('explore')} />
                    {/* notification  */}
                    <NotificationComponent visible={false} isSection={isSection} />
                    {/* avatar */}                    
                    <ProfileIcon isSection={isSection}/>
                    {/* darkmode switcher */}
                    <DarkModeSwitcher visible={false}/>
                </div>
            </div>
        </Flowbite>
    )
}

export default NavigatioinBar