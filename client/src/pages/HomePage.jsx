import React, { useEffect, useState } from 'react'
import { useAuth } from '../routes/AuthContext';
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

// icons
import avatar from '../assets/avatar1.jpg'
import avatar2 from '../assets/avatar2.jpg'
import avatar3 from '../assets/avatar3.jpg'
import avatar4 from '../assets/avatar4.jpg'
import imgbanner from '../assets/chainsawman2.jpg'
import imgbanner2 from '../assets/lockscren.jpg'
import imgHome1 from '../assets/lockscren.jpg'
import imgHome2 from '../assets/lockscren.jpg'
import imgExplore1 from '../assets/lockscren.jpg'
import imgExplore2 from '../assets/lockscren.jpg'
import imgExplore3 from '../assets/lockscren.jpg'
import Message from '../components/Contents/Message'
// apis
import { getuserApi } from '../services/allAPIs';
import { fetchUserData } from '../utils/fetchuserdata';
import ViewUser from '../components/Contents/ViewUser';
import { useLocation, useParams } from 'react-router-dom';




const HomePage = ({ content }) => {
    const location =useLocation()
    console.log(location);
    
    const [section, isSection] = useState(content)
    const [userCreditials,setUserCreditial] = useState({
        username: "",
        displayname: "",
        role: "user",
        userImg: avatar,
        imgbanner: imgbanner,
        about: "",
        dob:"",
        post: [
            { id: 1, title: 'How is life', description: "life is so long as shit", img: imgbanner },
            { id: 2, title: 'super man is the coolest', description: "nobody is like a superman ", img: null },
            { id: 3, title: 'Demon slayer new season', description: "one of the amazing season has aired today", img: imgbanner2 }
        ],
        home: [
            { id: 1, username: 'jinu', userImg: avatar2, title: 'Welcome to Connectify!', description: 'Discover exciting content and make connections that matter.', img: null },
            { id: 2, username: 'kannan', userImg: avatar3, title: 'Latest Updates', description: 'Stay updated with the latest news and posts from the community.', img: imgHome2 }
        ],
        explore: [
            { id: 1, username: 'jinu', userImg: avatar, title: 'Technology', description: 'Explore the latest in tech and innovation.', img: imgExplore1 },
            { id: 2, username: 'charly', userImg: avatar3, title: 'Lifestyle', description: 'Tips and insights to improve your lifestyle.', img: null },
            { id: 3, username: 'aju', userImg: avatar4, title: 'Art & Culture', description: 'Dive into the world of art and culture.', img: imgExplore3 }
        ]
    })
    console.log(userCreditials);
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
            <NavigatioinBar isSection={isSection} userCreditials={userCreditials} />
            <div className='w-full h-[87vh] flex'>
                {/* slidebar */}
                <Sidebar isSection={isSection} />
                {/* content */}
                {section === 'home' ? <Home userCreditials={userCreditials} /> : ''}
                {section === 'explore' ? <Explore userCreditials={userCreditials} /> : ''}
                {section === 'createpost' ? <CreatePost /> : ''}
                {section === 'notification' ? <NotificationSection /> : ''}
                {section === 'viewProfile' ? <Profile userCreditials={userCreditials} isSection={isSection}   /> : ''}
                {section === 'community' ? <Community isSection={isSection} /> : ''}
                {section === 'message' ? <Message /> : ''}
                {section === 'setting' ? <Settings /> : ''}
                {section === 'viewuser' ? <ViewUser/> : ''}
            </div>
        </div>
    )
}

export default HomePage