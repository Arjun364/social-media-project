import React, { useState, useEffect } from 'react'
import { serverUrl } from '../../services/serverUrl';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import { fetchUserData } from '../../utils/fetchuserdata';

import avatar from '../../assets/avatar2.jpg'

const ViewUser = () => {
    const navigate = useNavigate()
    const [tab, setTab] = useState('post')
    const [userdata, setUserdata] = useState({
        username: "",
        displayname: "",
        role: "user",
        userImg: avatar,
        imgbanner: null,
        about: "",
        dob: "",
        post: 0,
        comments: 0,
        explore: []
    });

    const { id } = useParams()
    console.log(id);

    useEffect(() => {
        const getuserdata = async () => {
            const result = await fetchUserData(id)
            console.log(result);


            setUserdata({
                username: result.user.username,
                displayname: result.user.displayname,
                role: result.user.role,
                userImg: result.user.profilePic,
                imgbanner: result.user.bannerPic,
                about: result.user.description,
                dob: result.user.dob,
                post: result.user.karmas.post,
                comments: result.user.karmas.comment
            })
        }
        getuserdata()
    }, [])
    return (
        <div className='w-full h-full flex gap-3 md:px-[2rem] lx:px-[8rem] py-4 overflow-x-hidden overflow-y-scroll'>
            {/* left section */}
            <div className=' h-full flex-1 flex flex-col gap-3 px-[2rem] py-[1rem]'>
                {/* profile photo and userid */}
                <div className='w-full flex items-center gap-2'>
                    <img src={`${serverUrl}/${userdata.userImg}`} alt="profile section" className='w-[8rem] h-[8rem] rounded-full' />
                    <div className='flex flex-col'>
                        <h3 className='leading-[1.4rem] flex items-center gap-2'>{userdata.displayname || "username"} {userdata.role == "admin" ? <div className='bg-red-500 rounded-full flex items-center justify-center text-white text-sm py-1 px-2'>admin</div> : ""}</h3>
                        <span className={`${userdata.role == "admin" ? "text-red-500" : "text-slate-600"}`}>{userdata.role == "admin" ? "a" : "u"}/{userdata.username}</span>
                    </div>
                </div>
                {/* tab section */}
                <div className="w-full flex items-center dark:bg-gray-800 dark:text-white border-b-2 border-solid dark:border-slate-400">
                    <Link rel="noopener noreferrer" to={`/viewuser/${id}/post`} className={`px-5 py-1 border-b-2 border-solid ${tab === "post" ? 'border-black dark:border-white' : 'border-transparent'} `} onClick={() => setTab("post")}>Post</Link>
                    <Link rel="noopener noreferrer" to={`/viewuser/${id}/comments`} className={`px-5 py-1 border-b-2 ${tab === "comments" ? 'border-black dark:border-white' : 'border-transparent'}`} onClick={() => setTab("comments")}>comments</Link>
                    <Link rel="noopener noreferrer" to={`/viewuser/${id}/saved`} className={`px-5 py-1 border-b-2 ${tab === "saved" ? 'border-black dark:border-white' : 'border-transparent'}`} onClick={() => setTab("saved")}>saved</Link>
                </div>
                {/* the content section  */}
                <Outlet />
            </div>
            {/* right section */}
            <div className='bg-slate-100 dark:bg-slate-900 h-full w-[20rem] rounded-md overflow-x-hidden overflow-y-scroll hidden flex-col  xl:flex'>
                <img src={`${serverUrl}/${userdata.imgbanner}`} alt="banner" className='max-h-[10rem]' />
                <div className='px-2 flex flex-col gap-2'>
                    <h3>{userdata.displayname}</h3>
                    <p className='text-slate-600 dark:text-slate-400 font-semibold'>{userdata.about || "user description"}</p>
                    {/* info  */}
                    <div className='w-full grid grid-cols-2 gap-2 *:text-base'>
                        <div className='flex flex-col'>{userdata.post}<span className='text-slate-600 dark:text-slate-400 text-[.8rem]'>Post Karma</span></div>
                        <div className='flex flex-col'>{userdata.comments}<span className='text-slate-600 dark:text-slate-400 text-[.8rem]'>Comment Karma</span></div>
                        <div className='flex flex-col'>{userdata.dob}<span className='text-slate-600 dark:text-slate-400 text-[.8rem]'>Cake Day</span></div>
                    </div>

                    <hr className='w-full h-[.1rem] border-0 bg-slate-300' />
                </div>
            </div>
        </div>
    )
}

export default ViewUser