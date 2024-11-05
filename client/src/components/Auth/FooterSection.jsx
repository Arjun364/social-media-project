import React from 'react'
// icons
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
const FooterSection = () => {
  return (
    <div className='h-full w-[4rem] bg-black text-white flex flex-col items-center py-7 justify-end gap-4'>
        <FaInstagram className='text-[1.5rem]' />
        <FaTwitter className='text-[1.5rem]' />
    </div>
  )
}

export default FooterSection