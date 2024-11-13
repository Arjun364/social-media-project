import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
// componets
import SearchComponent from './SearchComponent'
//icons
import { IoNotificationsOutline } from "react-icons/io5";
import NotificationComponent from './notificationComponent';
import DarkModeSwitcher from './DarkModeSwitcher';

const MobNav = ({isSection}) => {
    const [isNotification, setIsNotification] = useState(true)


    return (
        <div className='w-full border-b-2 border-solid flex items-center justify-between px-3 py-3 md:hidden'>
            <SearchComponent visible={true} />
            {/* notification  */}
            <div className='flex items-center gap-2'>
                <NotificationComponent visible={true} isSection={isSection} />
                <DarkModeSwitcher visible={true} />
            </div>
        </div>
    )
}

export default MobNav