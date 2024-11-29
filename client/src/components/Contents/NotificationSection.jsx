import React from 'react'

const NotificationSection = ({ }) => {
    return (
        <div className='w-full h-full flex flex-col gap-3 px-[2rem] md:px-[4rem] lx:px-[8rem] py-4 overflow-hidden '>
            <h3>Notifications</h3>
            <div className='w-full flex items-center justify-between'><span className='text-slate-600 dark:text-slate-200 font-medium uppercase'>Today</span> <span className='hover:text-blue-700 cursor-pointer'>Mark all as read</span></div>
            {/* the messgage section */}
            <div className='w-full flex flex-col'>
                {/* messgae one */}
                <div className='w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-200 rounded-md cursor-pointer'>
                    <img src="" alt="" className='w-[3rem] h-[3rem] bg-black rounded-full' />
                    {/* content */}
                    <div className='flex flex-col'>
                        <span className='font-medium'>IndiaToday</span>
                        <p className='text-sm text-slate-700 dark:text-slate-400'>The description of the messages is shown here.</p>
                    </div>
                </div>
                {/* messgae one */}
                <div className='w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-200 rounded-md cursor-pointer'>
                    <img src="" alt="" className='w-[3rem] h-[3rem] bg-black rounded-full' />
                    {/* content */}
                    <div className='flex flex-col'>
                        <span className='font-medium'>IndiaToday</span>
                        <p className='text-sm text-slate-700 dark:text-slate-400'>The description of the messages is shown here.</p>
                    </div>
                </div>
            </div>
            <span className='text-slate-600 dark:text-slate-200 font-medium uppercase'>Earlier</span>
            <div className='w-full '>
                {/* messgae one */}
                <div className='w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-200 rounded-md cursor-pointer'>
                    <img src="" alt="" className='w-[3rem] h-[3rem] bg-black rounded-full' />
                    {/* content */}
                    <div className='flex flex-col'>
                        <span className='font-medium'>IndiaToday</span>
                        <p className='text-sm text-slate-700 dark:text-slate-400'>The description of the messages is shown here.</p>
                    </div>
                </div>                {/* messgae one */}
                <div className='w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-200 rounded-md cursor-pointer'>
                    <img src="" alt="" className='w-[3rem] h-[3rem] bg-black rounded-full' />
                    {/* content */}
                    <div className='flex flex-col'>
                        <span className='font-medium'>IndiaToday</span>
                        <p className='text-sm text-slate-700 dark:text-slate-400'>The description of the messages is shown here.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotificationSection