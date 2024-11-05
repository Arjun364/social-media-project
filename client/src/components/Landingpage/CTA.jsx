import React from 'react'
import { useNavigate } from "react-router-dom";

const CTA = () => {
    const navigate = useNavigate()
    return (
        <section className='w-full h-[100vh] text-black dark:text-white dark:bg-slate-900 overflow-hidden px-[1rem] md:px-[4rem] py-[6rem] flex flex-col items-center justify-center  gap-4'>
            <h2 className='text-center'>Ready to Join the Community?</h2>
            <p className='max-w-[35rem] text-center text-sm md:text-base text-slate-800 dark:text-gray-400'>Create your profile today and become part of a dynamic community where knowledge, passion, and ideas flourish.</p>
            <button className='btn' onClick={()=>navigate('/registration')}>Get Started Now</button>
        </section>
    )
}

export default CTA