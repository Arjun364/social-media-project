import React, { useEffect, useState } from 'react'

// flowbite
import { Dropdown, Button, Modal, FloatingLabel } from "flowbite-react";

// icons
import { HiDotsHorizontal } from "react-icons/hi";
import { FaRegHeart, FaRegComment, FaHeart } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { serverUrl } from '../../services/serverUrl';
import { useNavigate } from 'react-router-dom';
import { createcommentAPI, getpostcommentsAPI } from '../../services/allAPIs';
// the alert libary
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Post = ({ postdata }) => {
    const navigate = useNavigate()
    const [isLike, setIsLike] = useState(false)
    const [isBook, setIsBook] = useState(false)
    const [Comment, setComment] = useState({
        comment: "",
        userid: '',
        postid: ''
    })
    const [commentlist, setcommentlist] = useState([])
    const [errMsg, setErrMsg] = useState('')
    const [openComments, setOpenComments] = useState(false);

    console.log(postdata);
    console.log(commentlist);
    

    // to fetch the comments
    const fetchComments = async () => {
        try {
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
                // let make the header file for the reqbody
                const reqheader = {
                    "Authorization": `Bearer ${userToken}`
                }
                // get the api response
                const result = await getpostcommentsAPI(postdata._id, reqheader)
                console.log(result);
                // check the result status
                if (result.status == 200) {
                    setcommentlist(result.data.comments)
                    console.log(`fetches the comments successfuly`);
                } else if (result.status == 201) {
                    console.log(`No comments found`);
                    setErrMsg(result.data.message)
                } else if (result.status == 401) {
                    console.log(`post is not found`);
                } else {
                    console.log(`Error fetching comments`);
                }
            }

            // check if the user and token is present
        } catch (error) {
            console.error(`Error fetching comments: ${error}`);
        }
    }

    useEffect(() => {
        fetchComments()
    }, [])
    // function to add comment section
    const handlecomments = async () => {
        try {
            const currentuser = JSON.parse(sessionStorage.getItem("user"))
            // Function to extract a specific cookie value
            const getCookie = (cookieName) => {
                const cookies = document.cookie.split('; ');
                const cookie = cookies.find(row => row.startsWith(`${cookieName}=`));
                return cookie ? cookie.split('=')[1] : null;
            };

            // Fetch the user token from cookies
            const userToken = getCookie('userToken');

            // check if the user and token is present
            if (currentuser.userid && userToken) {
                // let make the header file for the reqbody
                const reqheader = {
                    "Authorization": `Bearer ${userToken}`
                }
                const reqbody = {
                    userid: currentuser.userid,
                    postid: postdata._id,
                    comment: Comment.comment
                }
                // get the api response
                const result = await createcommentAPI(reqbody, reqheader)
                console.log(result);
                // check the result status
                if (result.status == 200) {
                    setComment({ comment: '', userid: '', postid: '' })
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
                    fetchComments()
                    // setOpenComments(false)
                } else if (result.status == 401) {
                    console.log(result.data.message);
                } else if (result.status == 400) {
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
                } else {
                    toast.error(result.response.data.message, {
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
        } catch (error) {
            console.log(`The error in commenting on the post `);
        }

    }
    return (
        <div>
            {/* the post  */}
            <div className="rounded-md shadow-md sm:w-96 dark:bg-slate-900 dark:text-white">
                <ToastContainer />
                <div className="flex items-center justify-between p-3">
                    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate(`/community/${postdata.creator?.communityid}`)}>
                        <img src={`${serverUrl}/${postdata.creator?.communityImg}`} alt="post community icon " className="object-cover object-center w-8 h-8 rounded-full shadow-sm dark:bg-gray-500 dark:border-gray-300" />
                        <div className="flex flex-col md:flex-row md:items-center gap-1 ">
                            <h2 className="text-sm font-semibold leading-none">{postdata.creator?.communityname}</h2>
                            <span className="inline-block text-xs leading-none text-slate-500 dark:text-gray-600">updated on {postdata.dateofcreation} </span>
                        </div>
                    </div>
                    {/* dropdown menu */}
                    <Dropdown label="" dismissOnClick={false} renderTrigger={() => <button title="Open options" type="button" >
                        <HiDotsHorizontal />
                    </button>}>
                        <Dropdown.Item className='text-red-600'>Delete</Dropdown.Item>
                        <Dropdown.Item className='text-black'>Download post</Dropdown.Item>
                    </Dropdown>
                </div>
                <div className='w-full px-3'>
                    <h3 >{postdata.title}</h3>
                </div>
                {
                    postdata.postType === "img/video" && postdata.postmedia ? (
                        postdata.postmedia.endsWith(".mp4") ? (
                            <video
                                controls
                                src={`${serverUrl}/${postdata.postmedia}`}
                                className="object-cover object-center w-full h-72 dark:bg-gray-500"
                            >
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <img
                                src={`${serverUrl}/${postdata.postmedia}`}
                                alt="The user post"
                                className="object-cover object-center w-full h-72 dark:bg-gray-500"
                            />
                        )
                    ) : (
                        ""
                    )
                }
                <div className="p-3 flex flex-col gap-2">
                    <p className="text-sm dark:text-slate-400">
                        <span className="text-base dark:text-white font-semibold"><span onClick={() => navigate(`/viewuser/${postdata.creator?.userid}`)}>@{postdata.creator?.username}</span></span>{postdata.discription} <a href={postdata.link} className='text-blue-500 hover:text-blue-600 focus:text-blue-900' target='blank'>{postdata.link}</a>
                    </p>
                    {/* the interaction section */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            {isLike ?
                                <FaHeart className={`text-[1.5rem]`} onClick={() => setIsLike(!isLike)} />
                                :
                                <FaRegHeart className={`text-[1.5rem]`} onClick={() => setIsLike(!isLike)} />
                            }
                            <FaRegComment className='text-[1.5rem] cursor-pointer' onClick={() => setOpenComments(true)} />
                            <FiShare2 className='text-[1.5rem]' />
                        </div>
                        {isBook ?
                            <FaBookmark className='text-[1.5rem]' onClick={() => setIsBook(!isBook)} />
                            :
                            <FaRegBookmark className='text-[1.5rem]' onClick={() => setIsBook(!isBook)} />
                        }
                    </div>
                </div>
                {/* comment section body */}
                <Modal dismissible show={openComments} onClose={() => setOpenComments(false)} size={"md"}>
                    <Modal.Header>comments</Modal.Header>
                    <Modal.Body>
                        <div className="space-y-2 min-h-[18rem] overflow-y-scroll overflow-x-hidden noscroll">
                            {/* comment section */}
                            {
                                commentlist?.map((comment, index) => (
                                    <div key={index} className='w-full px-2 py-3 border border-solid border-slate-200 rounded-md flex items-center gap-3 hover:shadow-md transition-all duration-100 ease-linear'>
                                        <img src={`${serverUrl}/${comment.userImg}`} alt="profilepic" className='w-[3rem] h-[3rem] object-cover rounded-full' />
                                        <div className='flex flex-col'>
                                            <span className='font-semibold text-sm cursor-pointer' onClick={() => navigate(`/viewuser/${comment.userid}`)}>{comment.username}</span>
                                            <span className='text-sm'>{comment.comment}</span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <input type="text" value={Comment.comment} className='txtbox' onChange={(e) => setComment({ ...Comment, comment: e.target.value })} />
                        <Button onClick={handlecomments}>send</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </div>
    )
}

export default Post