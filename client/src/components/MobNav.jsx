import React, { useState } from 'react'
// componets
import SearchComponent from './SearchComponent'
//icons
import { IoNotificationsOutline } from "react-icons/io5";
import NotificationComponent from './notificationComponent';

const MobNav = () => {
    const [isNotification, setIsNotification] = useState(true)
    return (
        <div className='w-full border-b-2 border-solid flex items-center justify-between px-3 py-3 md:hidden'>
            <SearchComponent visible={true} />
            {/* notification  */}
            <NotificationComponent visible={true} />
        </div>
    )
}

export default MobNav