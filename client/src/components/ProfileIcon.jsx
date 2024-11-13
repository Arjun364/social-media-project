import React, { useState } from 'react'
import { Flowbite, Avatar, Dropdown } from "flowbite-react";

// icons
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import avatar from '../assets/avatar1.jpg'
import avatar2 from '../assets/avatar2.jpg'
import avatar3 from '../assets/avatar3.jpg'
import avatar4 from '../assets/avatar4.jpg'
import DarkModeSwitcher from './DarkModeSwitcher';
const ProfileIcon = () => {
    const [dropdown,setDropDown]= useState(false)
    const [seletedItem,setSeletedItem] = useState('')

    const handleitem=(item)=>{
        setSeletedItem(item)
        setDropDown(false)
    }

    return (
        <div className='relative'>
            {/* profile icon */}
            <Avatar img={avatar} className='cursor-pointer' rounded status="online" statusPosition="bottom-right" onClick={()=>setDropDown(!dropdown)} />
            {/* profile menu */}
            <ul className={`${dropdown?'':'hidden'} flex flex-col gap-1 absolute bottom-[3.5rem] md:bottom-[-10.5rem] right-0 w-[13rem] border-2 border-solid bg-white border-slate-200 rounded-md p-1`}>
                <li className={`${seletedItem=="viewProfile"?'bg-slate-100':''} w-full h-[2.5rem] hover:bg-slate-100 flex items-center gap-2 px-2 rounded-sm cursor-pointer`} onClick={()=>handleitem('viewProfile')}><FaUserCircle className='text-[1.6rem]' />View Profile</li>
                <li className={`${seletedItem=="logout"?'bg-slate-100':''} w-full h-[2.5rem] hover:bg-slate-100 flex items-center gap-2 px-2 rounded-sm cursor-pointer`} onClick={()=>handleitem('logout')}><HiOutlineLogout className='text-[1.6rem]'/> Logout</li>
                <li className={`${seletedItem=="setting"?'bg-slate-100':''} w-full h-[2.5rem] hover:bg-slate-100 flex items-center gap-2 px-2 rounded-sm cursor-pointer`} onClick={()=>handleitem('setting')}><IoSettingsOutline className='text-[1.6rem]'/> Settings</li>
            </ul>
        </div>

    )
}

export default ProfileIcon