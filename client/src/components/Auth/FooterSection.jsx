import React from 'react'
// icons
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
const FooterSection = () => {
  return (
    <div className='h-[4rem] md:h-full w-full md:w-[4rem] bg-black text-white flex md:flex-col items-center px-4 md:px-0 md:py-7 justify-end gap-4'>
        <FaInstagram className='text-[1.5rem]' />
        <FaTwitter className='text-[1.5rem]' />
    </div>
  )
}

export default FooterSection