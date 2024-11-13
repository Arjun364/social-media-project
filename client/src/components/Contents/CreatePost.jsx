import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
// flowbite componets
import { Dropdown, Flowbite, FloatingLabel } from "flowbite-react";
// icons
import { IoIosArrowDown } from "react-icons/io";

const CreatePost = () => {
    const [isCommunityDropped, setIsCommunityDropped] = useState(false)
    const [community, setCommunity] = useState('Select community')
    const [isContent, setIsContent] = useState('text')

    const handleContent = (content) => {
        setIsContent(content)

    }

    const handleCommunity = (item) => {
        setCommunity(item)
        setIsCommunityDropped(false)
    }


    return (
        <div className='w-full h-full flex flex-col gap-3 px-6 py-4 overflow-hidden '>
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
                                    <motion.li
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="flex items-center gap-2 cursor-pointer hover:bg-slate-200 px-2 py-1 rounded-sm"
                                        onClick={() => handleCommunity("example1")}
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
                                        className="flex items-center gap-2 cursor-pointer hover:bg-slate-200 px-2 py-1 rounded-sm"
                                        onClick={() => handleCommunity("example2")}
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
                                        className="flex items-center gap-2 cursor-pointer hover:bg-slate-200 px-2 py-1 rounded-sm"
                                        onClick={() => handleCommunity("example3")}
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
                                        className="flex items-center gap-2 cursor-pointer hover:bg-slate-200 px-2 py-1 rounded-sm"
                                        onClick={() => handleCommunity("example4")}
                                    >
                                        <div className="w-[2rem] h-[2rem] rounded-full bg-slate-400"></div>
                                        example4
                                    </motion.li>
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
                        <FloatingLabel variant="outlined" label="Title" className='' />
                        {/* text */}
                        {isContent==='text'?<textarea name="description" id="description" className='w-full resize-none h-[10rem] border-slate-300 rounded-md' placeholder='Description'></textarea>:""}
                        {/* image/video */}
                        {isContent==='img/video'?<div className='w-full border-2 border-dotted text-sm text-slate-500 flex flex-col items-center justify-center gap-3 border-slate-300 rounded-md h-[10rem]'>
                            Drag the file or Upload the it <button className='btn'>Upload</button>
                        </div>:""}
                        {isContent==='link'?<FloatingLabel variant="outlined" label="Link" className='' />:''}
                        {/* submit btn */}
                        <button className='btn3'>Post</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CreatePost