import React from 'react'
import { useNavigate } from "react-router-dom";
// motion
import { animate, motion } from "framer-motion"
// components 
import Login from '../components/Auth/Login'
import Registration from '../components/Auth/Registration'
import FooterSection from '../components/Auth/FooterSection'
// videos
import signbg from '../assets/signup.mp4'
import loginbg from '../assets/login.mp4'
// icons
import { IoIosArrowBack } from "react-icons/io";

const Authentication = ({signin}) => {
  const navigate = useNavigate()
  
  return (
    <div className='w-full h-[100vh] flex flex-col md:flex-row items-center justify-between relative'>
      <div className='flex-1 w-full h-full p-[2rem] overflow-hidden relative'>
      <span className=' text-white font-bold text-[1.3rem] z-50 hidden md:flex items-center gap-1 cursor-pointer' onClick={()=>navigate(-1)}><IoIosArrowBack className='text-[1.5rem]'/> Back</span>
      {signin?
      <video src={loginbg} className='absolute inset-0 object-cover w-full h-full top-0 left-0 -z-50'  muted autoPlay loop ></video>
      :
      <video src={signbg} className='absolute inset-0 object-cover w-full h-full top-0 left-0 -z-50'  muted autoPlay loop ></video>
      }
      </div>
      {signin?<Login/>:<Registration/>}
      <FooterSection/>
    </div>
)
}

export default Authentication