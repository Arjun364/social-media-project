import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
// flowbite componets
import { FloatingLabel } from "flowbite-react";
// icons
import { IoIosArrowDown } from "react-icons/io";
import { createpostAPI, getusercommunitiesAPI, getuserfollowinglistAPI } from '../../services/allAPIs';
import { useNavigate, useParams } from 'react-router-dom';
import { serverUrl } from '../../services/serverUrl';
// the alert libary
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// loader libary
import { TailSpin } from 'react-loader-spinner';


const CreatePost = () => {
    const navigate = useNavigate()
    const { communityid } = useParams()
    const [isLoading, setIsLoading] = useState(false);
    const [isCommunityDropped, setIsCommunityDropped] = useState(false)
    const [community, setCommunity] = useState('Select community')
    const [isContent, setIsContent] = useState('text')
    const [communitylist, setcommunitylist] = useState([])
    const [postDetails, setPostdetails] = useState({
        title: '',
        content: '',
        communityid: '',
        media: null,
        link: "",
        postType: ""
    })
    const [PreviewMedia, setPreviewMedia] = useState(null);

    const handleContent = (content) => {
        setIsContent(content)
        setPostdetails({ ...postDetails, postType: content })
    }

    console.log(postDetails);
    console.log(PreviewMedia);



    const handleCommunity = (item) => {
        const itemArray = item.split('/')
        setCommunity(itemArray[0])
        navigate(`/createpost/${itemArray[1]}`)
        setIsCommunityDropped(false)
    }

    useEffect(() => {
        const setCommunityFromURL = () => {
            if (communityid && communitylist.length > 0) {
                // Find the community with the matching ID
                const matchedCommunity = communitylist.find(
                    (item) => item._id === communityid || item.communityid === communityid
                );

                // If a matching community is found, set its name
                if (matchedCommunity) {
                    setCommunity(matchedCommunity.name || matchedCommunity.communityname);
                }
            }
        };

        setCommunityFromURL();
    }, [communityid, communitylist]); // Dependency on communityid and communitylist

    // let just fetch the user following community list and user created community list to here

    // let fetch the user following community list
    const fetchFollowingListandusercreatedcommunity = async () => {
        try {
            // let fetch the user token and current user
            const currentuser = JSON.parse(sessionStorage.getItem("user"))
            // Function to extract a specific cookie value
            const getCookie = (cookieName) => {
                const cookies = document.cookie.split('; ');
                const cookie = cookies.find(row => row.startsWith(`${cookieName}=`));
                return cookie ? cookie.split('=')[1] : null;
            };
            const token = getCookie('userToken');
            // check if the user and the token is present
            if (currentuser && token) {
                // create the header to be passed down to the api
                const reqheader = {
                    "Authorization": `Bearer ${token}`,
                }
                // Initialize the combined list
                let combinedCommunityList = [];
                // let fetch the user following list
                const followingList = await getuserfollowinglistAPI(currentuser.userid, reqheader)
                // console.log(followingList);
                if (followingList.status == 200) {

                    combinedCommunityList = [...followingList.data?.followingList]; // Add following list
                }
                // let fetch the user created community
                const userCreatedCommunity = await getusercommunitiesAPI(currentuser.userid, reqheader)
                // console.log(userCreatedCommunity);
                if (userCreatedCommunity.status == 200) {
                    // let assign the fetched data to the state
                    // Combine the two arrays
                    combinedCommunityList = [
                        ...userCreatedCommunity.data?.communities, // Add user-created communities
                        ...combinedCommunityList // Existing combined list
                    ];
                }
                // Update the combined community list state
                setcommunitylist(combinedCommunityList);

            } else {
                console.log('user not found');
            }
        } catch (err) {
            console.log(`error in the fetching the following list: ${err}`);
        }
    }

    // let fetch the user created community list 
    useEffect(() => {
        fetchFollowingListandusercreatedcommunity()
    }, [])
    // console.log(communitylist);

    // To handle the post media
    const handlePostcreation = async () => {
        try {
            setIsLoading(true); // Start showing the loader
            // let fetch the user token and current user
            const currentuser = JSON.parse(sessionStorage.getItem("user"))
            // Function to extract a specific cookie value
            const getCookie = (cookieName) => {
                const cookies = document.cookie.split('; ');
                const cookie = cookies.find(row => row.startsWith(`${cookieName}=`));
                return cookie ? cookie.split('=')[1] : null;
            };
            const token = getCookie('userToken');
            // check if the user and the token is present
            if (currentuser.userid && token) {
                // create the header to be passed down to the api
                const reqheader = {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
                // let create the reqbody to be passed down to the api
                const formdata = new FormData();
                // let set rebody as form data the condition for the post type
                if (postDetails.postType == 'text') {
                    formdata.append('title', postDetails.title);
                    formdata.append('discription', postDetails.content);
                    formdata.append('postType', postDetails.postType);
                    formdata.append('userid', currentuser.userid)
                } else if (postDetails.postType == 'link') {
                    formdata.append('title', postDetails.title);
                    formdata.append('link', postDetails.link);
                    formdata.append('postType', postDetails.postType);
                    formdata.append('userid', currentuser.userid)
                } else if (postDetails.postType == 'img/video') {
                    formdata.append('title', postDetails.title);
                    if (postDetails.media instanceof File) {
                        formdata.append('postMedia', postDetails.media);
                    }
                    formdata.append('postType', postDetails.postType);
                    formdata.append('userid', currentuser.userid)
                }

                // let call the api to create the post
                const result = await createpostAPI(communityid, formdata, reqheader)
                console.log(result);
                if (result.status >= 200 && result.status <= 299) {
                    // let show the success message
                    toast.success('Post created successfully', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true, draggable: true,
                        progress: undefined,
                        theme: "light", transition: Bounce,
                    })
                    // let reset the form
                    setPostdetails({
                        title: '',
                        content: '',
                        communityid: '',
                        media: null,
                        link: "",
                        postType: ""
                    })
                    // let navigate to the home page
                    navigate('/home')
                } else if (result.status >= 300 && result.status <= 399) {
                    // let show the warn message
                    toast.warn(result.response.data.message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true, draggable: true,
                        progress: undefined,
                        theme: "light", transition: Bounce,
                    })
                } else {
                    // let show the error message
                    toast.error(result.response.data.message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true, draggable: true,
                        progress: undefined,
                        theme: "light", transition: Bounce,
                    })
                }
            }

        } catch (error) {
            console.log(`error in the post creation: ${err}`);
        } finally {
            setIsLoading(false); // Stop showing the loader
        }
    }

    return (
        <div className='w-full h-full flex flex-col gap-3 px-6 py-4 overflow-y-scroll overflow-x-hidden'>
            <ToastContainer />
            {isLoading ? (
                <div className="w-full h-full flex justify-center items-center">
                    <TailSpin
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="loading"
                    />
                </div>
            ) : (
                <div className='max-w-[40rem] flex flex-col gap-4 h-full border-2 border-solid px-3 py-2'>
                    {/* header section */}
                    <div className='flex items-center justify-between'>
                        <h3>Create Post </h3>
                        Draft
                    </div>
                    {/* select community */}
                    <div className={`w-[15rem] flex flex-col gap-2  relative`}>
                        <button name='recent' className='flex items-center justify-between font-medium px-4 py-2 text-slate-700 hover:bg-slate-200 bg-slate-100 focus:bg-slate-200 rounded-full transition-all ease-linear duration-150' onClick={() => setIsCommunityDropped(!isCommunityDropped)}>
                            <div>
                                {community}
                            </div>
                            <IoIosArrowDown className={`${isCommunityDropped ? 'rotate-180' : ''}`} />
                        </button>
                        {/* Dropdown menu with animated items */}
                        <ul className={`absolute z-50 top-[3rem] ${isCommunityDropped ? 'bg-slate-100 ' : ''} w-full rounded-lg py-2 px-2 flex flex-col gap-1`}>
                            <AnimatePresence>
                                {isCommunityDropped && (
                                    <>
                                        {/* option1 */}
                                        {
                                            communitylist?.length > 0 && communitylist?.map((item, index) => (
                                                <motion.li
                                                    key={index}
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                    className="flex items-center gap-2 cursor-pointer hover:bg-slate-200 px-2 py-1 rounded-sm"
                                                    onClick={() => handleCommunity(`${item.name || item.communityname}/${item._id || item.communityid}`)}
                                                >
                                                    <div className="w-[2rem] h-[2rem] rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${item.communityimage ? `${serverUrl}/${item.communityimage.replace(/\\/g, "/")}` : item.communitiyIcon ? `${serverUrl}/${item.communitiyIcon.replace(/\\/g, "/")}` : ""})` }}></div>
                                                    {item.name || item.communityname}
                                                </motion.li>
                                            ))
                                        }
                                    </>
                                )}
                            </AnimatePresence>
                        </ul>
                    </div>
                    {/* content add  sections  */}
                    <div className='w-full px-2 flex flex-col gap-5'>
                        {/* header section */}
                        <ul className=' w-full flex items-center justify-start md:gap-3'>
                            <li className={`text-sm border-b-2 border-solid  hover:bg-slate-200 px-2 py-1 ${isContent === 'text' ? 'border-black' : 'border-transparent'} cursor-pointer `} onClick={() => handleContent('text')}>Text </li>
                            <li className={`text-sm border-b-2 border-solid  hover:bg-slate-200 px-2 py-1 ${isContent === 'img/video' ? 'border-black' : 'border-transparent'} cursor-pointer `} onClick={() => handleContent('img/video')}>Images & videos</li>
                            <li className={`text-sm border-b-2 border-solid  hover:bg-slate-200 px-2 py-1 ${isContent === 'link' ? 'border-black' : 'border-transparent'} cursor-pointer `} onClick={() => handleContent('link')}>links</li>
                        </ul>
                        {/* body */}
                        <div className='w-full flex flex-col gap-3 '>
                            {/* title */}
                            <FloatingLabel variant="outlined" label="Title" className='' onChange={(e) => setPostdetails({ ...postDetails, title: e.target.value })} />
                            {/* text */}
                            {isContent === 'text' ? <textarea name="description" id="description" className='w-full resize-none h-[10rem] border-slate-300 rounded-md' placeholder='Description' onChange={(e) => setPostdetails({ ...postDetails, content: e.target.value })}></textarea> : ""}
                            {/* image/video */}
                            {isContent === 'img/video' ?
                                <div className='w-full border-2 border-dotted text-sm text-slate-500 flex flex-col items-center justify-center gap-3 border-slate-300 rounded-md min-h-[10rem] max-h-[20rem] object-contain'>
                                    {PreviewMedia ? (
                                        postDetails.media?.type.startsWith('image/') ? ( // Check if it's an image
                                            <img src={PreviewMedia} alt="Preview" className="w-full h-full object-cover" />
                                        ) : postDetails.media?.type.startsWith('video/') ? ( // Check if it's a video
                                            <video controls className="w-full h-full object-cover">
                                                <source src={PreviewMedia} type={postDetails.media?.type} />
                                                Your browser does not support the video tag.
                                            </video>
                                        ) : null
                                    ) : (
                                        <div className="flex flex-col justify-center items-center">
                                            <p>Drag the file or Upload it</p>
                                            <button className="btn" onClick={() => document.getElementById('media').click()}>
                                                Upload
                                            </button>
                                            <input
                                                id="media"
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => {
                                                    const selectedFile = e.target.files[0];
                                                    if (selectedFile) {
                                                        setPostdetails({ ...postDetails, media: selectedFile });
                                                        setPreviewMedia(URL.createObjectURL(selectedFile)); // Generate a URL for the preview
                                                    }
                                                }}
                                            />
                                        </div>
                                    )}

                                </div> : ""}
                            {isContent === 'link' ? <FloatingLabel variant="outlined" label="Link" className='' onChange={(e) => setPostdetails({ ...postDetails, link: e.target.value })} /> : ''}
                            {/* submit btn */}
                            <button className='btn3' onClick={handlePostcreation}>Post</button>
                        </div>
                    </div>

                </div>
            )}

        </div>
    )
}

export default CreatePost