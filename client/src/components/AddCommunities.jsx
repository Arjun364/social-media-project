import React, { useEffect, useState } from 'react'
// flowbite
import { Button, Modal, FloatingLabel } from "flowbite-react";
// framer motion
import { motion, AnimatePresence } from 'framer-motion';
// icons
import { MdAdd } from "react-icons/md";
import { FaRegImage } from "react-icons/fa";
// images
import bannerimage from '../assets/chainsawman2.jpg'
import avatar from '../assets/avatar1.jpg'
import { fetchUserData } from '../utils/fetchuserdata';
import { createcommunityAPI } from '../services/allAPIs';
// the alert libary
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddCommunities = ({getusercommunities}) => {
    const [openModal, setOpenModal] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 3;
    const [CommmunityDetails, setCommunityDetails] = useState({
        communityName: "",
        communityDescription: "",
        communityBanner: "",
        communityIcon: "",
        communityView: "Public",
        ismature: false
    })
    const [bannerPreview, setBannerPreview] = useState(bannerimage)
    const [iconPreview, setIconPreview] = useState(avatar)
    const [userdata, setUserdata] = useState(null)
    // functions for the handling the creating of the community
    const handleCreation = async () => {
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

            // if the  both of the current user and the token is fetched successfuly
            if (currentuser.userid && userToken) {
                // let make the header file for the reqbody
                const reqheader = {
                    "Authorization": `Bearer ${userToken}`,
                    "Content-Type": "multipart/form-data"
                }
                // create the struture of the reqbody

                const formdata = new FormData()
                formdata.append("name", CommmunityDetails.communityName);
                formdata.append("community", CommmunityDetails.communityView);
                formdata.append("ismature", CommmunityDetails.ismature);
                formdata.append("title", "The title of the description");
                formdata.append("content", CommmunityDetails.communityDescription);
                formdata.append("username", userdata.username);
                formdata.append("userid", userdata._id);
                if (CommmunityDetails.communityIcon instanceof File) {
                    formdata.append("icon", CommmunityDetails.communityIcon);
                }
                if (CommmunityDetails.communityBanner instanceof File) {
                    formdata.append("banner", CommmunityDetails.communityBanner);
                }

                // let post the request
                const result = await createcommunityAPI(formdata, reqheader)
                console.log(result);
                if (result.status >= 200 && result.status <= 299) {
                    // for success creating the community
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
                    setOpenModal(false)
                    setCommunityDetails({
                        communityName: "",
                        communityDescription: "",
                        communityBanner: null,
                        communityIcon: null,
                        communityView: "",
                        ismature: false
                    })
                    setCurrentSlide(0)
                    setBannerPreview(bannerimage)
                    setIconPreview(avatar)
                    getusercommunities()

                } else if (result.status >= 300 && result.status<=499) {
                    // when the all text fields are not inputed 
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
                } else if (result.status == 500){
                    // when the usename is already taken 
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
        } catch (err) {
            console.error(`The error in creating the community:${err}`);
        }
    }
    useEffect(() => {
        const getuserdata = async () => {
            const currentuser = JSON.parse(sessionStorage.getItem('user'))
            const response = await fetchUserData(currentuser.userid)
            setUserdata(response.user)
        }
        getuserdata()
    }, [])
    return (
        <div>
            <ToastContainer />
            {/* addcommunity */}
            {/* modal button  */}
            <motion.li
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setOpenModal(true)}
            >
                <div className="w-[2rem] h-[2rem] rounded-full flex items-center justify-center"><MdAdd className='text-[1.7rem]' /></div>
                Add community
            </motion.li>
            {/* modal body  */}
            <Modal show={openModal} onClose={() => setOpenModal(false)} size={"3xl"}>

                <Modal.Body className='dark:bg-gray-900 dark:text-white'>
                    <div className='max-w-full flex flex-col gap-4 h-full  px-3 py-2'>
                        {/* header section */}
                        <div className='flex flex-col  justify-between'>
                            <h3>{currentSlide == 0 ? "Create Commmunity" : ""} {currentSlide == 1 ? "Style your community" : ""} {currentSlide == 2 ? "What kind of community is this?" : ""}</h3>
                            <p className='text-[13px]'>{currentSlide == 0 ? "A name and description help people understand what your community is all about." : ""}{currentSlide == 1 ? "Adding visual flair will catch new members attention and help establish your community’s culture! You can update this at any time" : ""} {currentSlide == 2 ? "Decide who can view and contribute in your community. Only public communities show up in search. Important: Once set, you will need to submit a request to change your community type." : ""}</p>
                        </div>
                        {/* content add  sections  */}
                        <div className='w-full px-2 flex gap-5 items-start'>
                            {/* body */}
                            <div className='min-w-[20rem] flex flex-col gap-3 '>
                                {/* title */}
                                {currentSlide == 0 ?
                                    <>
                                        <FloatingLabel variant="outlined" label="Community name" value={CommmunityDetails.communityName} onChange={(e) => setCommunityDetails({ ...CommmunityDetails, communityName: e.target.value.replace(/\s+/g, '') })} />
                                        <textarea name="description" id="description" value={CommmunityDetails.communityDescription} className='w-full resize-none h-[10rem] dark:bg-gray-900 border-slate-300 rounded-md' placeholder='Description' onChange={(e) => setCommunityDetails({ ...CommmunityDetails, communityDescription: e.target.value })}></textarea>
                                    </> : ""}
                                {/* style tha community */}
                                {/* text */}
                                {currentSlide == 1 ? <div className='flex flex-col gap-3'>
                                    {/* banner uploads */}
                                    <label htmlFor='banner' className='w-full flex justify-between items-center'>Banner <span className='px-2 py-1 border-2 border-solid border-black rounded-full flex items-center gap-3'><FaRegImage className='text-[1.5rem]' />Change</span><input id='banner' type='file' className='hidden' onChange={(e) => {
                                        const file = e.target.files[0];
                                        const previewUrl = URL.createObjectURL(file);
                                        setBannerPreview(previewUrl)
                                        setCommunityDetails({ ...CommmunityDetails, communityBanner: file })
                                    }} ></input></label>
                                    {
                                        CommmunityDetails.communityBanner ?
                                            // selected banner name 
                                            <div className='w-full border border-dashed border-gray-400 rounded-md px-2 py-2'>
                                                {/* file name of the banner */}
                                                {CommmunityDetails.communityBanner.name}
                                            </div>
                                            : ""
                                    }
                                    {/* icons uploads */}
                                    <label htmlFor='icon' className='w-full flex justify-between items-center'>Icon  <span className='px-2 py-1 border-2 border-solid border-black rounded-full flex items-center gap-3'><FaRegImage className='text-[1.5rem]' />Change</span><input id='icon' type='file' className='hidden' onChange={(e) => {
                                        const file = e.target.files[0];
                                        const previewUrl = URL.createObjectURL(file);
                                        setIconPreview(previewUrl)
                                        setCommunityDetails({ ...CommmunityDetails, communityIcon: file })
                                    }}></input></label>
                                    {
                                        CommmunityDetails.communityIcon ?
                                            // selected banner name 
                                            <div className='w-full border border-dashed border-gray-400 rounded-md px-2 py-2'>
                                                {/* file name of the banner */}
                                                {CommmunityDetails.communityIcon.name}
                                            </div> : ""
                                    }

                                </div> : ""}
                                {/* community type */}
                                {currentSlide == 2 ?
                                    <div className='w-full h-full'>
                                        <div className='w-full'>
                                            {["Public", "Restricted", "Private"].map((option) => (
                                                <div key={option} onClick={() => setCommunityDetails({ ...CommmunityDetails, communityView: option })} className={`flex items-center p-4 mb-2 rounded-lg cursor-pointer border ${CommmunityDetails.communityView === option ? "bg-blue-50 border-blue-500" : "border-gray-300"}`}>
                                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 border ${CommmunityDetails.communityView === option ? "border-blue-500" : "border-gray-400"}`}>
                                                        {CommmunityDetails.communityView === option && (
                                                            <div className="w-3 h-3 bg-blue-500 rounded-full" />
                                                        )}
                                                    </div>
                                                    <span className="text-sm">{option}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-between mt-4 p-4 border rounded-lg">
                                            <div className="flex items-center">
                                                <div className="w-5 h-5 rounded-lg bg-gray-200 flex items-center justify-center text-sm mr-3">18</div>
                                                <span className="text-sm">Mature (18+)</span>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" checked={CommmunityDetails.ismature} onChange={() => setCommunityDetails({ ...CommmunityDetails, ismature: !CommmunityDetails.ismature })} className="sr-only" />
                                                <div className={`w-10 h-6 flex items-center rounded-full ${CommmunityDetails.ismature ? "bg-blue-500" : "bg-gray-300"}`}>
                                                    <div className={`h-4 w-4 bg-white rounded-full transform transition-transform ${CommmunityDetails.ismature ? "translate-x-5" : "translate-x-1"}`}
                                                    />
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    : ""}
                            </div>
                            {/* demo section  */}
                            {currentSlide == 0 || currentSlide == 1 ?
                                <div className='w-[20rem] h-auto flex gap-4  flex-col border border-solid rounded-lg shadow-lg '>
                                    {currentSlide == 1 ? <div className='w-full h-[3rem] bg-cover bg-center' style={{ backgroundImage: `url(${bannerPreview})` }}></div> : ""}
                                    <div className='flex items-center gap-4 px-[1rem] py-[.5rem]'>
                                        {currentSlide == 1 ? <img src={iconPreview} alt="avataricon" className='w-[5rem] max-h-[4rem] rounded-full object-cover' /> : ""}
                                        <div
                                            className='flex w-[13rem] flex-col h-auto '
                                            style={{
                                                minHeight: '80px', // Minimum height
                                                height: 'auto', // Automatically adjusts to content
                                            }}>
                                            <h6 className='text-[1rem] font-semibold break-words'>c/{CommmunityDetails.communityName || "communityname"} </h6>
                                            <p className='text-[13px] text-gray-600'>1 member • 1 online</p>
                                            <p className='text-sm break-words'>
                                                {CommmunityDetails.communityDescription || "Your community description"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                : ""}

                        </div>
                        {/* slide indicator */}
                        <div>
                            <div className="flex items-center justify-center gap-2">
                                {Array.from({ length: totalSlides }).map((_, index) => (
                                    <span
                                        key={index}
                                        className={`w-[8px] h-[8px]  rounded-full transition-all duration-100 ease-linear ${currentSlide === index ? "bg-black" : "bg-slate-400"}`}
                                    ></span>
                                ))}
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='dark:bg-gray-900' >
                    {/* navigation buttons */}
                    {currentSlide == 2 ? <Button onClick={handleCreation}>Create</Button> : <Button onClick={() => setCurrentSlide(currentSlide + 1)}>Next</Button>}
                    {currentSlide == 0 ?
                        <Button color="gray" onClick={() => setOpenModal(false)}>Cancel</Button> : <Button color="gray" onClick={() => setCurrentSlide(currentSlide - 1)}>Back</Button>}

                </Modal.Footer>
            </Modal>
        </div >
    )
}

export default AddCommunities