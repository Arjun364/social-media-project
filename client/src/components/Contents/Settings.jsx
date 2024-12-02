import React,{useState} from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

const Settings = () => {
    const [tab, setTab] = useState('')
    return (
        <div className='w-full h-full flex flex-col gap-3 px-[1rem] md:px-[4rem] py-4 overflow-x-hidden overflow-y-scroll'>
            <div className='w-full h-full flex flex-col gap-3'>
                <h2>Settings</h2>
                {/* tab section  */}
                <div className="flex items-center dark:bg-gray-100 dark:text-gray-800 ">
                    <NavLink rel="noopener noreferrer" to="/setting/account" className={`px-5 py-1 border-b-2 border-solid ${tab === "account" ? 'border-black dark:border-white' : 'border-transparent'} `} onClick={() => setTab("account")}>Account</NavLink>
                    <NavLink rel="noopener noreferrer" to="/setting/profile" className={`px-5 py-1 border-b-2 border-solid ${tab === "profileSetting" ? 'border-black dark:border-white' : 'border-transparent'} `} onClick={() => setTab("profileSetting")}>Profile</NavLink>
                </div>
                <Outlet/>
            </div>
        </div>
    )
}

export default Settings