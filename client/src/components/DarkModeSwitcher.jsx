import React from 'react'
import useDarkTheme from '../Theme/useDarkTheme'
import { FaSun,FaMoon  } from "react-icons/fa6";

const DarkModeSwitcher = ({visible}) => {
    const [isDark,setIsDark]=useDarkTheme()
  return (
    <div className={`${visible ? '' : 'hidden'} cursor-pointer transition-all ease-linear duration-150 md:inline-block ${isDark?"hover:text-orange-400":"hover:text-blue-400"}`} onClick={()=>setIsDark(!isDark)}>
        {isDark?<FaSun className='text-[1.4rem]'/>:<FaMoon className='text-[1.4rem]'/>}
    </div>
  )
}

export default DarkModeSwitcher