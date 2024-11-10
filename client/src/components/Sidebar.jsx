import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
// flowbite
import { Dropdown, Flowbite } from "flowbite-react";
// icons
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import AddCommunities from './AddCommunities';



const Sidebar = () => {
    const [isRecentDropped, setIsRecentDropped] = useState(true)
    const [isCommunityDropped, setIsCommunityDropped] = useState(true)

    return (
        <div className='hidden md:block w-[20rem] h-full p-[1.5rem] border-r-2 border-solid overflow-x-hidden overflow-y-scroll noscroll'>
            {/* main sidebar */}
            <div className='flex flex-col gap-1 border-b border-solid pb-5'>
                {/* home section */}
                <motion.button className='w-full flex items-center gap-3 font-medium px-2 py-2 hover:bg-slate-200 focus:bg-slate-100 rounded-md transition-all ease-linear duration-150'>
                    <AiOutlineHome className='text-[1.5rem]' />
                    Home
                </motion.button>
                {/* expolre section */}
                <motion.button className='w-full flex items-center gap-3 font-medium px-2 py-2 hover:bg-slate-200 focus:bg-slate-100 rounded-md transition-all ease-linear duration-150'>
                    <MdOutlineExplore className='text-[1.5rem]' />
                    Explore
                </motion.button>
            </div>
            {/* recent section */}
            <div className={`${isRecentDropped ? 'pb-5' : ''} flex flex-col gap-2 border-b border-solid `}>
                <button name='recent' className='w-full flex items-center justify-between font-medium px-2 py-2 text-slate-700 hover:bg-slate-200 focus:bg-slate-100 rounded-md transition-all ease-linear duration-150' onClick={() => setIsRecentDropped(!isRecentDropped)}>
                    recent
                    <IoIosArrowDown className={`${isRecentDropped ? 'rotate-180' : ''}`} />
                </button>
                {/* Dropdown menu with animated items */}
                <ul className="px-2 flex flex-col gap-2">
                    <AnimatePresence>
                        {isRecentDropped && (
                            <>
                                {/* option1 */}
                                <motion.li
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="flex items-center gap-2"
                                >
                                    <div className="w-[2rem] h-[2rem] rounded-full bg-slate-400"></div>
                                    example1
                                </motion.li>
                                {/* option2 */}
                                <motion.li
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="flex items-center gap-2"
                                >
                                    <div className="w-[2rem] h-[2rem] rounded-full bg-slate-400"></div>
                                    example2
                                </motion.li>
                                {/* option3 */}
                                <motion.li
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="flex items-center gap-2"
                                >
                                    <div className="w-[2rem] h-[2rem] rounded-full bg-slate-400"></div>
                                    example3
                                </motion.li>
                                {/* option4 */}
                                <motion.li
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="flex items-center gap-2"
                                >
                                    <div className="w-[2rem] h-[2rem] rounded-full bg-slate-400"></div>
                                    example4
                                </motion.li>
                            </>
                        )}
                    </AnimatePresence>
                </ul>
            </div>
            {/* communities section */}
            <div className={`${isCommunityDropped ? 'pb-5' : ''} flex flex-col gap-2 border-b border-solid `}>
                <button name='recent' className='w-full flex items-center justify-between font-medium px-2 py-2 text-slate-700 hover:bg-slate-200 focus:bg-slate-100 rounded-md transition-all ease-linear duration-150' onClick={() => setIsCommunityDropped(!isCommunityDropped)}>
                    Communities
                    <IoIosArrowDown className={`${isCommunityDropped ? 'rotate-180' : ''}`} />
                </button>
                {/* Dropdown menu with animated items */}
                <ul className="px-2 flex flex-col gap-2">
                    <AnimatePresence>
                        {isCommunityDropped && (
                            <>
                                <AddCommunities/>
                                {/* option1 */}
                                <motion.li
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="flex items-center gap-2"
                                >
                                    <div className="w-[2rem] h-[2rem] rounded-full bg-slate-400"></div>
                                    community1
                                </motion.li>
                                {/* option2 */}
                                <motion.li
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="flex items-center gap-2"
                                >
                                    <div className="w-[2rem] h-[2rem] rounded-full bg-slate-400"></div>
                                    community2
                                </motion.li>
                                {/* option3 */}
                                <motion.li
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="flex items-center gap-2"
                                >
                                    <div className="w-[2rem] h-[2rem] rounded-full bg-slate-400"></div>
                                    community3
                                </motion.li>
                                {/* option4 */}
                                <motion.li
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="flex items-center gap-2"
                                >
                                    <div className="w-[2rem] h-[2rem] rounded-full bg-slate-400"></div>
                                    community4
                                </motion.li>
                            </>
                        )}
                    </AnimatePresence>
                </ul>
            </div>

        </div>
    )
}

export default Sidebar