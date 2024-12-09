import React, { useEffect, useState } from 'react'
import Post from '../Post'

import { getuserpostsAPI } from '../../../services/allAPIs'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const [errMsg, setErrMsg] = useState('')

  // console.log(posts);
  
  const getuserCreatedPosts = async () => {
    
    try {
      const currentuser = JSON.parse(sessionStorage.getItem("user"))
      // Function to extract a specific cookie value
      const getCookie = (cookieName) => {
        const cookies = document.cookie.split('; ');
        const cookie = cookies.find(row => row.startsWith(`${cookieName}=`));
        return cookie ? cookie.split('=')[1] : null;
      };
  
      // Fetch the user token from cookies
      const userToken = getCookie('userToken');
      
      // check if the user and token is present
      if (currentuser.userid && userToken) {
        // let make the header file for the reqbody
        const reqheader = {
          "Authorization": `Bearer ${userToken}`,
        }
        // get the api response
        const result = await getuserpostsAPI(currentuser.userid, reqheader)
        console.log(result);

        // check the result status
        if (result.status == 200) {
          setPosts(result.data.posts)
        }else if (result.status == 201) {
          setErrMsg(result.data.message)
        }else if (result.status == 401) {
          console.log("unauthorized access");
        }

      }
    } catch (err) {
      console.log(`The error in fetching the user created posts`);
      
    }
  }

  useEffect(() => {
    getuserCreatedPosts()
  }, [])

  return (
    <div className='w-full h-[40rem] flex flex-col gap-[1rem] pb-4 overflow-x-hidden overflow-y-scroll'>
      {
        errMsg?
        <h4>{errMsg}</h4>:
        posts?.map((post) => <Post postdata={post} />)
      }
    </div>
  )
}

export default Posts