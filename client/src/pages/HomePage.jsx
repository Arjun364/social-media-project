import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
// componets
import NavigatioinBar from '../components/NavigatioinBar'
import Sidebar from '../components/Sidebar'
import MobNav from '../components/MobNav'
// content section
import Home from '../components/Contents/Home'
import Explore from '../components/Contents/Explore'
import CreatePost from '../components/Contents/CreatePost'
import NotificationSection from '../components/Contents/NotificationSection'
import Profile from '../components/Contents/Profile'
import Settings from '../components/Contents/Settings'
import Community from '../components/Contents/Community'
import Message from '../components/Contents/Message'
import ViewUser from '../components/Contents/ViewUser';





const HomePage = ({ content }) => {
    const location =useLocation()
    // console.log(location);
    
    const [section, isSection] = useState(content)
    // Update section based on the current URL
    useEffect(() => {
        const path = location.pathname.split('/')[1]; // Extract the first segment of the path
        isSection(path || 'home'); // Default to 'home' if path is empty
    }, [location]); // Run whenever the location changes
    
    return (
        <div className='w-full h-[100vh] dark:bg-gray-800 dark:text-white flex flex-col items-center' >
            {/* navigation bar for mobiles */}
            <MobNav isSection={isSection} />
            {/*default navigation bar  */}
            <NavigatioinBar isSection={isSection} />
            <div className='w-full h-[87vh] flex'>
                {/* slidebar */}
                <Sidebar isSection={isSection} />
                {/* content */}
                {section === 'home' ? <Home section={section}/> : ''}      
                {section === 'explore' ? <Explore/> : ''}
                {section === 'createpost' ? <CreatePost /> : ''}
                {section === 'notification' ? <NotificationSection /> : ''}
                {section === 'viewProfile' ? <Profile isSection={isSection}   /> : ''}
                {section === 'community' ? <Community isSection={isSection} /> : ''}
                {section === 'message' ? <Message /> : ''}
                {section === 'setting' ? <Settings /> : ''}
                {section === 'viewuser' ? <ViewUser/> : ''}
            </div>
        </div>
    )
}

export default HomePage