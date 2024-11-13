import React, { useState } from 'react'

// icons
import avatar2 from '../../assets/avatar2.jpg'
import avatar3 from '../../assets/avatar3.jpg'
import { HiDotsHorizontal } from "react-icons/hi";
import { FaRegHeart, FaRegComment, FaHeart } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";


const Post = () => {
    const [isLike, setIsLike] = useState(false)
    const [isBook, setIsBook] = useState(false)
    return (
        <div className="rounded-md shadow-md sm:w-96 dark:bg-gray-50 dark:text-gray-800">
            <div className="flex items-center justify-between p-3">
                <div className="flex items-center space-x-2">
                    <img src={avatar2} alt="" className="object-cover object-center w-8 h-8 rounded-full shadow-sm dark:bg-gray-500 dark:border-gray-300" />
                    <div className="flex flex-col md:flex-row items-center gap-1 ">
                        <h2 className="text-sm font-semibold leading-none">leroy_jenkins72</h2>
                        <span className="inline-block text-xs leading-none text-slate-500 dark:text-gray-600">updated 4 days ago </span>
                    </div>
                </div>
                <button title="Open options" type="button">
                    <HiDotsHorizontal />
                </button>
            </div>
            <div className='w-full px-3'>
                <h3 >The title </h3>
            </div>
            <img src="https://source.unsplash.com/301x301/?" alt="" className="object-cover object-center w-full h-72 dark:bg-gray-500" />
            <div className="p-3 flex flex-col gap-2">

                <p className="text-sm">
                    <span className="text-base font-semibold">leroy_jenkins72</span>Nemo ea quasi debitis impedit!
                </p>
                {/* the interaction section */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        {isLike ?
                            <FaHeart className={`text-[1.5rem]`} onClick={() => setIsLike(!isLike)} />
                            :
                            <FaRegHeart className={`text-[1.5rem]`} onClick={() => setIsLike(!isLike)} />
                        }
                        <FaRegComment className='text-[1.5rem]' />
                        <FiShare2 className='text-[1.5rem]' />
                    </div>
                    {isBook ?
                        <FaBookmark className='text-[1.5rem]' onClick={() => setIsBook(!isBook)} />
                        :
                        <FaRegBookmark className='text-[1.5rem]' onClick={() => setIsBook(!isBook)} />
                    }

                </div>

                <input type="text" placeholder="Add a comment..." className="w-full py-0.5 dark:bg- border-none rounded text-sm pl-0 dark:text-gray-800" />
            </div>
        </div>
    )
}

export default Post