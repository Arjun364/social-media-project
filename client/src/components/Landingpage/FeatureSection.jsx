import React from 'react'
// icons
import { FaPeopleGroup } from "react-icons/fa6";
import { LuHeartHandshake } from "react-icons/lu";
import { FaSlideshare } from "react-icons/fa6";
const FeatureSection = () => {
    return (
        <section className={`w-full min-h-[100vh] text-black dark:text-white dark:bg-slate-900 overflow-hidden px-[2rem] md:px-[4rem] py-[3rem]  flex flex-col items-center justify-center gap-[6rem] relative `}>
            <div className="flex flex-col items-center gap-3">
                <h2 className="text-center lg:leading-[4rem]">Here are some of the benefits of joining Connectify</h2>
                <p className="max-w-[60rem] text-center text-slate-800 dark:text-gray-400">
                    Explore the key features that make Connectify a unique place to connect with like-minded individuals and foster meaningful interactions within niche communities.
                </p>
                {/* Add more content to ensure sufficient scroll length */}
            </div>
            <div className='flex flex-col lg:flex-row  gap-8'>
                {/* feature 1 */}
                <div className='max-w-[25rem] flex flex-col items-center'>
                    <FaPeopleGroup className='text-[8rem]' />
                    <h5 className='text-center'>Find Your Tribe</h5>
                    <p className='text-center text-sm lg:text-base text-slate-800 dark:text-gray-400'>Engage with members who share your passion, expertise, and vision. Build meaningful connections and expand your network within a focused community.</p>
                </div>
                {/* feature 2 */}
                <div className='max-w-[25rem] flex flex-col items-center'>
                    <FaSlideshare  className='text-[8rem]' />
                    <h5 className='text-center'>Share and Discover</h5>
                    <p className='text-center text-sm lg:text-base text-slate-800 dark:text-gray-400'>Create and share content that resonates with your niche, from articles and tutorials to project showcases. Discover fresh ideas and find inspiration from others.</p>
                </div>
                {/* feature 3 */}
                <div className='max-w-[25rem] flex flex-col items-center'>
                    <LuHeartHandshake  className='text-[8rem]' />
                    <h5 className='text-center'>Learn and Grow Together</h5>
                    <p className='text-center text-sm lg:text-base text-slate-800 dark:text-gray-400'>Access exclusive resources, join discussions, and exchange knowledge with community members. Unlock new insights and deepen your expertise.</p>
                </div>
            </div>
        </section>
    )
}

export default FeatureSection