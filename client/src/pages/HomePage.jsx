import React, { useState } from 'react'
import DarkModeSwitcher from '../components/DarkModeSwitcher'
import { motion } from "framer-motion"
import NavigatioinBar from '../components/NavigatioinBar'
import Sidebar from '../components/Sidebar'
import MobNav from '../components/MobNav'




const HomePage = () => {
    return (
        <div className='w-full h-[100vh] dark:bg-black dark:text-white flex flex-col items-center' >
            <MobNav />
            <NavigatioinBar />
            <div className='w-full h-[88vh] flex'>
            <Sidebar/>
            </div>
        </div>
    )
}

export default HomePage