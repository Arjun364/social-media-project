import React, { useState } from 'react'
// icons
import { IoNotificationsOutline } from "react-icons/io5";

const NotificationComponent = ({visible}) => {
    const [isNotification, setIsNotification] = useState(true)
    return (
        <div>
            <div className={`${visible ? 'flex' : 'hidden'} md:flex relative cursor-pointer`}>
                <div className={`${isNotification ? '' : 'hidden'} absolute top-0 right-0 p-[.4rem] bg-red-500 rounded-full text-[11px] flex items-center justify-center`}></div>
                <IoNotificationsOutline className='text-[1.8rem]' />
            </div>
        </div>
    )
}

export default NotificationComponent