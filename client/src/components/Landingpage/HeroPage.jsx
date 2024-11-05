import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
// motions
import { animate, motion } from "framer-motion"
// dark mode switcher
import DarkModeSwitcher from '../../components/DarkModeSwitcher'
// assets
import lightbg from '../../assets/lightbg.mp4'
import darkbg from '../../assets/darkbg.mp4'
const HeroPage = () => {
    const [isPageLoaded, setIsPageLoaded] = useState(false)
    const navigate = useNavigate()

    const fadeIn = {
        initial:{opacity:0,y:50},
        animate:{opacity:1,y:0},
        transition:{duration:1,ease:"easeIn"}
    }


    // Set the page loaded state to true after the component mounts
    useEffect(() => {
      const handleLoad = () => {
        setIsPageLoaded(true)
      }
  
      // Ensure we only trigger the animation after everything is loaded
      if (document.readyState === 'complete') {
        handleLoad()
      } else {
        window.addEventListener('load', handleLoad)
        return () => window.removeEventListener('load', handleLoad)
      }
    }, [])
  return (
    <section className={`w-full h-[100vh] overflow-hidden px-[1rem] md:px-[4rem] py-[6rem] text-white flex items-center relative`}>
        <video className='absolute inset-0 w-full h-full object-cover dark:opacity-0 opacity-100 transition-opacity duration-300 top-0 left-0 -z-50' autoPlay muted loop src={lightbg}></video>
        <video className='absolute inset-0 w-full h-full object-cover dark:opacity-100 opacity-0 transition-opacity duration-300 top-0 left-0 -z-50' autoPlay muted loop src={darkbg}></video>
        <div className='z-50 flex flex-col gap-1 md:gap-3 items-center md:items-start'>
            {/* text motion */}
            <motion.span {...fadeIn} animate={isPageLoaded ? fadeIn.animate : fadeIn.initial} transition={{ ...fadeIn.transition, delay: 0.2 }} className='logo'>Connetify</motion.span>
            <motion.h1 {...fadeIn} animate={isPageLoaded ? fadeIn.animate : fadeIn.initial} transition={{ ...fadeIn.transition, delay: 0.4 }} className='text-center md:text-left md:w-[50rem]'>Welcome to Your Community Hub!</motion.h1>
            <motion.p {...fadeIn} animate={isPageLoaded ? fadeIn.animate : fadeIn.initial} transition={{ ...fadeIn.transition, delay: 0.6 }} className='text-center md:text-left md:w-[40rem]'>A platform built for passionate individuals. Connect, learn, and grow with others who share your interests.</motion.p>
            <motion.button {...fadeIn} animate={isPageLoaded ? fadeIn.animate : fadeIn.initial} transition={{ ...fadeIn.transition, delay: 0.8 }} className='btn' onClick={()=>navigate('/registration')}>Join Now – It’s Free!</motion.button>
            <DarkModeSwitcher/>
        </div>
    </section>
  )
}

export default HeroPage