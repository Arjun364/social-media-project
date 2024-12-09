import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
// flowbite
import { Dropdown, Flowbite } from "flowbite-react";
// icons
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import AddCommunities from './AddCommunities';
import { getusercommunitiesAPI, getuserfollowinglistAPI } from '../services/allAPIs';
import { serverUrl } from '../services/serverUrl';




const Sidebar = ({ isSection }) => {
    const [isRecentDropped, setIsRecentDropped] = useState(true)
    const [isCommunityDropped, setIsCommunityDropped] = useState(true)
    const [userCommunities, setUserCommunities] = useState([])
    const [followingList, setFollowingList] = useState([])
    const [errormsg, seterrormsg] = useState('')
    const [errormsg2, seterrormsg2] = useState('')




    const navigate = useNavigate()
    const handleNavigation = (navigateto) => {
        const trimednavigate = navigateto.split('/')[0]
        isSection(trimednavigate)
        navigate(`/${navigateto}`)
    }

    const getusercommunities = async () => {
        try {
            // let fetch the user token and current user
            const currentuser = JSON.parse(sessionStorage.getItem("user"))
            // Function to extract a specific cookie value
            const getCookie = (cookieName) => {
                const cookies = document.cookie.split('; ');
                const cookie = cookies.find(row => row.startsWith(`${cookieName}=`));
                return cookie ? cookie.split('=')[1] : null;
            };

            // Fetch the user token from cookies
            const userToken = getCookie('userToken');

            if (currentuser.userid && userToken) {
                // let create the header to be passed down to the api 
                const reqheader = {
                    "Authorization": `Bearer ${userToken}`,
                }
                const result = await getusercommunitiesAPI(currentuser.userid, reqheader)
                // check the result status
                if (result.status == 200) {
                    setUserCommunities(result.data.communities)
                } else if (result.status == 201) {
                    seterrormsg(result.data.message)
                    setUserCommunities(result.data.communities)
                } else {
                    console.error(`error from the backend`);
                }
            }

        } catch (err) {
            console.error(`error in function  fetching the user created communities`);
        }
    }

    // to fetch the user following list of the current user
    const getFollowingList = async () => {
        try {
            // let fetch the user token and current user
            const currentuser = JSON.parse(sessionStorage.getItem("user"))
            // Function to extract a specific cookie value
            const getCookie = (cookieName) => {
                const cookies = document.cookie.split('; ');
                const cookie = cookies.find(row => row.startsWith(`${cookieName}=`));
                return cookie ? cookie.split('=')[1] : null;
            };

            // Fetch the user token from cookies
            const userToken = getCookie('userToken');
            // check if the user and the token is present
            if (currentuser.userid && userToken) {
                // let make the header file for the reqbody
                const reqheader = {
                    "Authorization": `Bearer ${userToken}`,
                }
                // get the api response
                const result = await getuserfollowinglistAPI(currentuser.userid, reqheader)
                // console.log(result);

                // check the result status
                if (result.status == 200) {
                    setFollowingList(result.data.followingList)
                } else if (result.status == 304) {
                    seterrormsg2(result.data.message)
                    setFollowingList(result.data.followingList)
                } else {
                    console.error(`error from the backend`);
                }
            }

        } catch (error) {
            console.error(`error in function  fetching the user created communities`);
        }
    }
    useEffect(() => {
        getusercommunities()
        getFollowingList()
    }, [])

    return (
        <div className='hidden md:block w-[20rem] h-full p-[1.5rem] border-r-2 border-solid overflow-x-hidden overflow-y-scroll noscroll'>
            {/* main sidebar */}
            <div className='flex flex-col gap-1 border-b border-solid pb-5'>
                {/* home section */}
                <motion.button className='w-full flex items-center gap-3 font-medium px-2 py-2 hover:bg-slate-200 dark:hover:bg-slate-700 focus:bg-slate-100 rounded-md transition-all ease-linear duration-150' onClick={() => handleNavigation('home')}>
                    <AiOutlineHome className='text-[1.5rem]' />
                    Home
                </motion.button>
                {/* expolre section */}
                <motion.button className='w-full flex items-center gap-3 font-medium px-2 py-2 hover:bg-slate-200 dark:hover:bg-slate-700 focus:bg-slate-100 rounded-md transition-all ease-linear duration-150' onClick={() => handleNavigation('explore')}>
                    <MdOutlineExplore className='text-[1.5rem]' />
                    Explore
                </motion.button>
            </div>
            {/* foll0wed community section */}
            <div className={`${isRecentDropped ? 'pb-5' : ''} flex flex-col gap-2 border-b border-solid `}>
                <button name='recent' className='w-full flex items-center justify-between font-medium px-2 py-2 text-slate-700 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 focus:bg-slate-100 dark:focus:bg-slate-600 rounded-md transition-all ease-linear duration-150' onClick={() => setIsRecentDropped(!isRecentDropped)}>
                    Followed communities
                    <IoIosArrowDown className={`${isRecentDropped ? 'rotate-180' : ''}`} />
                </button>
                {/* Dropdown menu with animated items */}
                <ul className="px-2 flex flex-col gap-2">
                    <AnimatePresence>
                        {isRecentDropped && (
                            <>
                                {
                                    followingList?.length == 0 ? errormsg :
                                        followingList.map((item, index) =>
                                            <motion.li
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="flex items-center gap-2 cursor-pointer"
                                                onClick={() => handleNavigation(`community/${item.communityid}`)}
                                                key={index}

                                            >
                                                <img src={`${serverUrl}/${item.communityimage}`} className='w-[2rem] h-[2rem] rounded-full object-cover' alt="" />
                                                {item.communityname}
                                            </motion.li>
                                        )
                                }
                            </>
                        )}
                    </AnimatePresence>
                </ul>
            </div>
            {/* communities section */}
            <div className={`${isCommunityDropped ? 'pb-5' : ''} flex flex-col gap-2 border-b border-solid `}>
                <button name='recent' className='w-full flex items-center justify-between font-medium px-2 py-2 text-slate-700 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 focus:bg-slate-100 dark:focus:bg-slate-600 rounded-md transition-all ease-linear duration-150' onClick={() => setIsCommunityDropped(!isCommunityDropped)}>
                    Your Communities
                    <IoIosArrowDown className={`${isCommunityDropped ? 'rotate-180' : ''}`} />
                </button>
                {/* Dropdown menu with animated items */}
                <ul className="px-2 flex flex-col gap-2">
                    <AnimatePresence>
                        {isCommunityDropped && (
                            <>
                                <AddCommunities getusercommunities={getusercommunities} />
                                {/* option1 */}
                                {
                                    userCommunities?.length == 0 ? errormsg :
                                        userCommunities.map((item, index) =>
                                            <motion.li
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="flex items-center gap-2 cursor-pointer"
                                                onClick={() => handleNavigation(`community/${item._id}`)}
                                                key={index}

                                            >
                                                <img src={`${serverUrl}/${item.communitiyIcon}`} className='w-[2rem] h-[2rem] rounded-full object-cover' alt="" />
                                                {item.name}
                                            </motion.li>
                                        )
                                }
                            </>
                        )}
                    </AnimatePresence>
                </ul>
            </div>

        </div>
    )
}

export default Sidebar