import React from 'react'
// icons
import {  IoSearch } from "react-icons/io5";

const SearchComponent = ({visible}) => {
    
    return (
        <div className={`${visible ? 'flex' : 'hidden'} md:w-[20rem] lg:w-[40rem] md:flex bg-slate-200 px-5 py-1 rounded-full gap-2 items-center`}>
            <IoSearch className='text-[1.2rem] text-slate-600' />
            <input type="text" className='txtbox2' placeholder='Search ' />
        </div>
    )
}

export default SearchComponent