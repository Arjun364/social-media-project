import React, { useEffect, useState } from 'react'
// flowbite
import { Avatar, Dropdown } from "flowbite-react";
// images
import bannerImg from '../../assets/lockscren.jpg'
// icons
import avatar4 from '../../assets/avatar4.jpg'
import avatar from '../../assets/avatar2.jpg'
import avatar3 from '../../assets/avatar3.jpg'
import { MdAdd } from "react-icons/md";
import { FaPenAlt } from "react-icons/fa";
import { IoEarthOutline } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
// components
import Post from './Post';
import { useNavigate, useParams } from 'react-router-dom';
import { getcommunityDetailsAPI, userjoincommunityAPI, userleavecommunityAPI } from '../../services/allAPIs';
import { serverUrl } from '../../services/serverUrl';
// the alert libary
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Community = ({ isSection }) => {
    const navigate = useNavigate()
    const [menu, setMenu] = useState(false)
    const [members, setMembers] = useState([
        { username: "arjun", img: avatar },
        { username: "jinu", img: avatar4 },
        { username: "charly", img: avatar3 },
        { username: "kannan", img: avatar }
    ])
    const [communityDetails, setCommunityDetails] = useState({})
    const { id } = useParams()
    const currentuser = sessionStorage.getItem('user')
    const [editor, setEditor] = useState(false)
    const [isjoin, setIsjoin] = useState(false)
    // handle navigation 
    const handleNavigation = (navigateto) => {
        const trimednavigate = navigateto.split('/')[0]
        isSection(trimednavigate)
        navigate(`/${navigateto}`)
    }

    // set the member 
    useEffect(() => {
        const setmembers = () => {
            setMembers(communityDetails.members)
        }
        setmembers()
    }, [communityDetails])


    // get the community details
    const getCommunitydetails = async () => {
        try {
            const currentuser = JSON.parse(sessionStorage.getItem("user")) //fetch the currrent user from the session storage
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
                // let provide the community id and reqheader for the community details api 
                const result = await getcommunityDetailsAPI(id, reqheader)
                // console.log(result);
                // Set the data if the response was 200
                if (result.status >= 200 && result.status <= 299) {
                    setCommunityDetails(result.data.community)
                    console.log(currentuser.userid);
                    const ismoderator = result.data.community.creator.userid === currentuser.userid
                    if (ismoderator) {
                        setEditor(true)
                    } else {
                        setEditor(false)
                    }
                    const isjoined = result.data.community.members.some(member => member.userid === currentuser.userid)
                    if (isjoined) {
                        setIsjoin(true)
                    }
                }

            } else {
                console.log(`Either currentuser or the usertoken is not founded`);

            }
        } catch (err) {
            console.error(`Error in fetching the comunity details`);

        }
    }
    useEffect(() => {
        // console.log(id);
        getCommunitydetails() // lets call the function to get details
        console.log(communityDetails);
    }, [id])

    // to set the user join handle function 
    const handleUserJoin = async () => {
        try {
            // let check if the user is the moderator if the community and let a message be displayed of you cannot use the join function 
            if (editor) {
                return toast.error('You cannot use this functionality as you are the moderator', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })
            }
            // if the user is not the moderator then use the join function 
            const currentuser = JSON.parse(sessionStorage.getItem("user")) //fetch the currrent user from the session storage
            // Function to extract a specific cookie value
            const getCookie = (cookieName) => {
                const cookies = document.cookie.split('; ');
                const cookie = cookies.find(row => row.startsWith(`${cookieName}=`));
                return cookie ? cookie.split('=')[1] : null;
            };
            // Fetch the user token from cookies
            const userToken = getCookie('userToken');
            if (isjoin) {
                // let define function to remove from the community if the user id alreay join in 
                if (currentuser.userid && userToken) {
                    // let make the header file for the reqbody
                    const reqheader = {
                        "Authorization": `Bearer ${userToken}`,
                    }
                    // let set the rebody of the request
                    const rebody = {
                        userid: currentuser.userid
                    }
                    // let provide the community id and reqheader for the leaving the community
                    const result = await userleavecommunityAPI(id, rebody, reqheader)
                    console.log(result);
                    if (result.status >= 200 && result.status <= 299) {
                        setIsjoin(!isjoin)
                        // for success in leaving  the community
                        toast.success(result.data.message, {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            transition: Bounce,
                        })
                    } else {
                        // for warn of user is already leaved the community
                        toast.warn(result.response.data.message, {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            transition: Bounce,
                        })
                    }
                }
            } else {
                // let define function to join in community  if the user id not presnt in the database
                if (currentuser.userid && userToken) {
                    // let make the header file for the reqbody
                    const reqheader = {
                        "Authorization": `Bearer ${userToken}`,
                    }
                    // let set the rebody of the request
                    const rebody = {
                        userid: currentuser.userid
                    }
                    // let provide the community id and reqheader for the joining the community
                    const result = await userjoincommunityAPI(id, rebody, reqheader)
                    console.log(result);
                    if (result.status >= 200 && result.status <= 299) {
                        setIsjoin(!isjoin)
                        // for success joining the community
                        toast.success(result.data.message, {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            transition: Bounce,
                        })
                    } else {
                        // for warn of user is already joined the community
                        toast.warn(result.response.data.message, {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            transition: Bounce,
                        })
                    }
                }
            }

            // fetch the community details after the function ends
            getCommunitydetails()
        } catch (error) {
            console.error(`Error in handling the user join in community`);
        }
        setIsjoin(!isjoin)
    }


    return (
        <div className='w-full h-full flex flex-col gap-3 md:px-[2rem] lx:px-[8rem] py-4 overflow-x-hidden overflow-y-scroll'>
            <ToastContainer />
            {/* header section */}
            <div className='w-full'>
                <div className={`w-full h-[10rem] rounded-md relative bg-cover bg-center bg-no-repeat`} style={{ backgroundImage: `url(${serverUrl}/${(communityDetails.communityBanner || "uploads/communities/banners/lockscren.jpg").replace(/\\/g, "/")})` }}>
                    <div className='absolute bottom-[-4rem] left-[.5rem] md:left-[3rem] flex items-end '>
                        <img src={`${serverUrl}/${communityDetails.communitiyIcon || "uploads/communities/images/avatar1.jpg"}`} alt="community icon" className=' border-[.5rem] border-solid border-white w-[8rem] h-[8rem] rounded-full  object-cover' />
                        <h5 className='pb-6'>{communityDetails.name || "community name"}</h5>
                    </div>
                </div>
                {/* community menu section */}
                <div className='w-full h-[3rem] px-5 flex items-center justify-end '>
                    <div className='hidden lg:flex items-center justify-end gap-4'>
                        <button className='btn4' onClick={() => navigate(`/createpost/${id}`)}><MdAdd className='text-[1.2rem]'  />Create Post</button>
                        <button className={` ${isjoin ? "btn6" : "btn5"}`} onClick={handleUserJoin}>{isjoin ? "Joined" : "Join"}</button>
                        {/* <BsThreeDots className='text-[1.5rem]' /> */}
                    </div>
                    {/*  */}

                    <div className='relative lg:hidden'>
                        <HiDotsHorizontal className=' text-[1.5rem]' onClick={() => setMenu(!menu)} />
                        <div className={`${menu ? '' : 'hidden'} absolute top-[1.5rem] right-0 w-[10rem] flex flex-col items-start gap-1 bg-white dark:bg-slate-600 rounded-md px-2 py-3`}>
                            <button className='btn4' onClick={() => navigate(`/createpost/${id}`)}><MdAdd className='text-[1.2rem]'  />Create Post</button>
                            <button className={` ${isjoin ? "btn6" : "btn5"}`} onClick={handleUserJoin}>{isjoin ? "Joined" : "Join"}</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* community posts */}
            <div className='w-full px-[2rem] flex gap-3'>
                {/* posts */}
                <div className='flex-1 flex flex-col'>
                    {/* <Post/> */}
                </div>
                {/* community description */}
                <div className='hidden lg:flex flex-col w-[20rem] h-[40rem] bg-slate-300 dark:bg-slate-500 rounded-md px-[1rem] py-2'>
                    {/* about the community */}
                    <div className='w-full flex flex-col gap-3 pb-3 border-b-2 border-solid '>
                        <div className='w-full flex flex-col gap-2'>
                            <span className='text-[.9rem] font-semibold'>{communityDetails.description?.title || "description title"}</span>
                            <p className='text-sm'>{communityDetails.description?.content || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia culpa tenetur incidunt animi tempore molestiae eaque repellat laborum, consequatur exercitationem deserunt sapiente sed autem temporibus qui officia quaerat expedita adipisci."}</p>
                            <span className='flex gap-2 text-sm items-center'><FaPenAlt /> {communityDetails.dateofcreation}</span>
                            <span className='flex gap-2 text-sm items-center'><IoEarthOutline /> {communityDetails.type?.community}</span>
                            <div className='w-full grid grid-cols-2'>
                                <div className='flex flex-col'>
                                    {communityDetails.members?.length}
                                    <span className='text-sm text-slate-700'>Members</span>
                                </div>
                                <div className='flex flex-col'>
                                    3K
                                    <span className='text-sm text-slate-700 flex items-center gap-1'><div className='w-[.6rem] h-[.6rem] bg-green-500 rounded-full'></div>Online</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* option */}
                    {
                        editor ?
                            <div className="flex items-center my-[1rem] justify-between px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm">
                                {/* Profile Section */}
                                <div className="flex items-center space-x-4">
                                    {/* Avatar */}
                                    <img
                                        src={
                                            communityDetails.communitiyIcon
                                                ? `${serverUrl}/${communityDetails.communitiyIcon}`
                                                : avatar4
                                        }
                                        alt="Profile Avatar"
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    {/* Profile Text */}
                                    <div>
                                        <h3 className="text-[16px] font-semibold text-gray-800">Profile</h3>
                                        <p className="text-[10px] text-gray-500">Customize your profile</p>
                                    </div>
                                </div>

                                {/* Edit Profile Button */}
                                <button
                                    className="px-4 py-2 text-[10px] font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                                    onClick={() => handleNavigation("setting")}
                                >
                                    Edit Profile
                                </button>
                            </div>
                            : ""
                    }
                    {/* members */}
                    <div className='w-full '>
                        <span className='font-medium'>Members</span>
                        <div className='w-full flex flex-col'>
                            {/* users */}
                            {members?.map((user, index) => (
                                <div key={index} className='w-full px-2 py-2 flex items-center gap-1 cursor-pointer rounded-md hover:bg-white/40 transition-all duration-100 ease-linear' onClick={() => handleNavigation(`viewuser/${user.userid}`)}>
                                    <img src={`${serverUrl}/${user.userimage}`} alt="avatar" className='w-[2.5rem] h-[2.5rem] rounded-full' />
                                    <span className={`text-sm ${user.usertype == "moderator" ? "text-orange-500" : ""}`}>{user.usertype == "moderator" ? "m" : "u"}/{user.username}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Community