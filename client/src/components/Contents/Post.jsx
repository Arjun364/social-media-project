import React, { useState } from 'react'

// flowbite
import { Dropdown, Button, Modal } from "flowbite-react";

// icons
import avatar2 from '../../assets/avatar2.jpg'
import avatar3 from '../../assets/avatar3.jpg'
import { HiDotsHorizontal } from "react-icons/hi";
import { FaRegHeart, FaRegComment, FaHeart } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";


const Post = ({userCreditials,postdata}) => {
    const [isLike, setIsLike] = useState(false)
    const [isBook, setIsBook] = useState(false)
    const [isComment, setIsComment] = useState('')

    console.log(userCreditials);
    

    // open the post section
    const [openModal, setOpenModal] = useState(false);
    return (
        <div>
            {/* the post  */}
            <div className="rounded-md shadow-md sm:w-96 dark:bg-slate-900 dark:text-white">
                <div className="flex items-center justify-between p-3">
                    <div className="flex items-center space-x-2">
                        <img src={postdata.userImg ||userCreditials.userImg} alt="" className="object-cover object-center w-8 h-8 rounded-full shadow-sm dark:bg-gray-500 dark:border-gray-300" />
                        <div className="flex flex-col md:flex-row md:items-center gap-1 ">
                            <h2 className="text-sm font-semibold leading-none">{postdata.username ||userCreditials.username }</h2>
                            <span className="inline-block text-xs leading-none text-slate-500 dark:text-gray-600">updated 4 days ago </span>
                        </div>
                    </div>

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
                {postdata.img?(
                <img src={postdata.img} alt="" className="object-cover object-center w-full h-72 dark:bg-gray-500" onClick={() => setOpenModal(true)} />
                ):""}
                {/* The body of the post */}
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Header>Terms of Service</Modal.Header>
                    <Modal.Body>
                        <div className="space-y-6">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
                                companies around the world are updating their terms of service agreements to comply.
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant
                                to ensure a common set of data rights in the European Union. It requires organizations to notify users as
                                soon as possible of high-risk data breaches that could personally affect them.
                            </p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => setOpenModal(false)}>I accept</Button>
                        <Button color="gray" onClick={() => setOpenModal(false)}>
                            Decline
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className="p-3 flex flex-col gap-2">
                    <p className="text-sm dark:text-slate-400">
                        <span className="text-base dark:text-white font-semibold">{postdata.username ||userCreditials.username } </span>{postdata.description}
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

                    <div className='w-full flex gap-2 items-center'>
                    <input type="text" placeholder="Add a comment..." className="w-full px-2 py-0.5 border-none rounded text-sm pl-0 dark:text-gray-800" onChange={(e)=>setIsComment(e.target.value)} />
                    {isComment.length==0?"":<button className='px-3 py-1 rounded-full text-white bg-blue-500 hover:bg-blue-600 focus:bg-blue-600'>send</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post