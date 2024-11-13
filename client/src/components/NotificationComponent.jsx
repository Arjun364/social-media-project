import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
// icons
import { IoNotificationsOutline } from "react-icons/io5";

const NotificationComponent = ({visible,isSection}) => {
    const [isNotification, setIsNotification] = useState(true)
    const navigate = useNavigate()
    const handleNavigation =(navigateto)=>{
        isSection(navigateto)
        navigate(`/${navigateto}`)
    }
    return (
        <div>
            {/* notifcation icon */}
            <div className={`${visible ? 'flex' : 'hidden'} md:flex relative cursor-pointer`} onClick={()=>handleNavigation('notification')}>
                <div className={`${isNotification ? '' : 'hidden'} absolute top-0 right-0 p-[.4rem] bg-red-500 rounded-full text-[11px] flex items-center justify-center`}></div>
                <IoNotificationsOutline className='text-[1.8rem]' />
            </div>
            {/*  */}
        </div>
    )
}

export default NotificationComponent