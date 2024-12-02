import React, { useState,useEffect } from 'react'
import { Flowbite, Avatar, Dropdown } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../routes/AuthContext';
import { serverUrl } from '../services/serverUrl';


// icons
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
// avatars
import avatar from '../assets/avatar1.jpg'
import avatar2 from '../assets/avatar2.jpg'
import avatar3 from '../assets/avatar3.jpg'
import avatar4 from '../assets/avatar4.jpg'
import DarkModeSwitcher from './DarkModeSwitcher';
// utlity function
import { fetchUserData } from '../utils/fetchuserdata';
const ProfileIcon = ({ isSection, userCreditials }) => {
    const { logout } = useAuth()

    const [dropdown, setDropDown] = useState(false)
    const [seletedItem, setSeletedItem] = useState('')
    const navigate = useNavigate()
    const [userimg,setUserimg] = useState(avatar)

    const handleitem = (item) => {
        setSeletedItem(item)
        setDropDown(false)
        if (item === 'logout') {
            logout()
        } if(item === 'setting'){
            isSection(item)
            navigate(`/${item}/account`)
        }if (item === 'viewProfile') {
            isSection(item)
            navigate(`/${item}/post`)
        }else {
            isSection(item)
            navigate(`/${item}`)
        }
    }

    useEffect(() => {
        const getuserdata = async () => {
            const result = await fetchUserData()
            setUserimg(result.user.profilePic)
        }
        getuserdata()
    })

    return (
        <div className='relative'>
            {/* profile icon */}
            <Avatar img={`${serverUrl}/${userimg}` || avatar} className='cursor-pointer' rounded status="online" statusPosition="bottom-right" onClick={() => setDropDown(!dropdown)} />
            {/* profile menu */}
            <ul className={`${dropdown ? '' : 'hidden'} flex flex-col gap-1 absolute bottom-[3.5rem] md:bottom-[-10.5rem] right-0 w-[13rem] border-2 border-solid bg-white dark:bg-gray-700 border-slate-200 rounded-md p-1 z-50`}>
                <li className={`${seletedItem == "viewProfile" ? 'bg-slate-100 dark:bg-slate-500' : ''} w-full h-[2.5rem] hover:bg-slate-100 flex items-center gap-2 px-2 rounded-sm cursor-pointer`} onClick={() => handleitem('viewProfile')}><FaUserCircle className='text-[1.6rem]' />View Profile</li>
                <li className={`${seletedItem == "logout" ? 'bg-slate-100 dark:bg-slate-500' : ''} w-full h-[2.5rem] hover:bg-slate-100 flex items-center gap-2 px-2 rounded-sm cursor-pointer`} onClick={() => handleitem('logout')}><HiOutlineLogout className='text-[1.6rem]' /> Logout</li>
                <li className={`${seletedItem == "setting" ? 'bg-slate-100 dark:bg-slate-500' : ''} w-full h-[2.5rem] hover:bg-slate-100 flex items-center gap-2 px-2 rounded-sm cursor-pointer`} onClick={() => handleitem('setting')}><IoSettingsOutline className='text-[1.6rem]' /> Settings</li>
            </ul>
        </div>

    )
}

export default ProfileIcon