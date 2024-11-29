import React from 'react'
import Post from '../Post'

import avatar from '../../../assets/avatar1.jpg'
import avatar2 from '../../../assets/avatar2.jpg'
import avatar3 from '../../../assets/avatar3.jpg'
import avatar4 from '../../../assets/avatar4.jpg'
import imgbanner from '../../../assets/chainsawman2.jpg'
import imgbanner2 from '../../../assets/lockscren.jpg'

const Posts = () => {
  const user = JSON.parse(sessionStorage.getItem('user'))
  const userCreditials={
    username:user.username,
    role:user.role,
    userImg:avatar,
    imgbanner:imgbanner,
    post:[
        {id:1,title:'How is life',description:"life is so long as shit" ,img:imgbanner},
        {id:2,title:'super man is the coolest',description:"nobody is like a superman " ,img:null},
        {id:3,title:'Demon slayer new season',description:"one of the amazing season has aired today" ,img:imgbanner2}
    ]
}
  console.log(userCreditials);
  
  return (
    <div className='w-full h-[40rem] overflow-x-hidden overflow-y-scroll'>
      {userCreditials.post.map((post)=>(
        <Post id={post.id} postdata={post} userCreditials={userCreditials}/>
      ))}
    </div>
  )
}

export default Posts