import React from 'react'
import { serverUrl } from '../services/serverUrl'
import { useNavigate } from 'react-router-dom'

const CommunityCard = ({communitydata}) => {
    const navigate = useNavigate()
  return (
    <div className='w-[30rem] min-h-[15rem] border border-solid border-black rounded-md'>
        <div className='w-full h-[8rem] relative bg-cover bg-center' style={{backgroundImage: `url('${serverUrl}/${communitydata.communityBanner.replace(/\\/g, "/")}')`}}>
            {/* community image */}
            <img src={`${serverUrl}/${communitydata.communitiyIcon}`} alt="community icon" className='w-[6rem] h-[6rem] rounded-full bg-slate-100 absolute top-[1rem] left-[1rem] object-cover' />
        </div>
        {/* content */}
        <div className='px-4 py-2 flex flex-col gap-2'>
            <div className='flex items-center justify-between'>
            {/* left section  */}
            <div className='leading-5'>
            <h4>{communitydata.name}</h4>
            <span className='text-sm text-gray-600'>@{communitydata.creator.username}</span>
            </div>
            {/* right section */}
            <button className='bg-blue-500 text-white px-3 py-1 rounded-full focus:bg-white focus:text-blue-500' onClick={()=>navigate(`/community/${communitydata._id}`)}>Learn more</button>
            </div>
            <p className='text-sm text-slate-800 h-[5rem] overflow-y-scroll scroll-smooth'>{communitydata.description.content}</p>
        </div>
    </div>
  )
}

export default CommunityCard