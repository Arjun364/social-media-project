import React, { useState } from 'react'
import NavigatioinBar from '../components/NavigatioinBar'
import Sidebar from '../components/Sidebar'
import MobNav from '../components/MobNav'
// content section
import Home from '../components/Contents/Home'
import Explore from '../components/Contents/Explore'
import CreatePost from '../components/Contents/CreatePost'
import NotificationSection from '../components/Contents/NotificationSection'





const HomePage = ({content}) => {
    const [section, isSection] = useState(content)
    return (
        <div className='w-full h-[100vh] dark:bg-black dark:text-white flex flex-col items-center' >
            {/* navigation bar for mobiles */}
            <MobNav isSection={isSection} />
            {/*default navigation bar  */}
            <NavigatioinBar isSection={isSection} />
            <div className='w-full h-[88vh] flex'>
                {/* slidebar */}
                <Sidebar isSection={isSection}/>
                {/* content */}
                {section==='home'?<Home/>:''}
                {section==='explore'?<Explore/>:''}
                {section==='createpost'?<CreatePost/>:''}
                {section==='notification'?<NotificationSection/>:''}
            </div>
        </div>
    )
}

export default HomePage