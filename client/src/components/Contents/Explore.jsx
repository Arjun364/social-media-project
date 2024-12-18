import React, { useEffect, useState } from 'react'
import CommunityCard from '../CommunityCard'
import { getEveryCommunitiesAPI } from '../../services/allAPIs'
import { useLocation } from 'react-router-dom'

const Explore = () => {
  const location = useLocation();
  const [communities, setCommunities] = useState([])
  const getCommunities = async () => {
    try {
      const currentuser = JSON.parse(sessionStorage.getItem("user")) //fetch the currrent user from the session storage
      // Function to extract a specific cookie value
      const getCookie = (cookieName) => {
        const cookies = document.cookie.split('; ');
        const cookie = cookies.find(row => row.startsWith(`${cookieName}=`));
        return cookie ? cookie.split('=')[1] : null;
      };
      // Fetch the user token from cookies
      const userToken = getCookie('userToken');
      if (currentuser.userid && userToken) {
        // let create the reheader
        const reqheader = {
          "Authorization": `Bearer ${userToken}`,
        }
        // let call the api 
        const result = await getEveryCommunitiesAPI(reqheader)
        // console.log(result);
        if (result.status >= 200 && result.status <= 299) {
          console.log(`fetches the explore page successfully`);
          setCommunities(result.data.communities)
        } else {
          console.log(`Error in fetching the explore page`);
        }
      }
    } catch (err) {
      console.log(`Error in fetching the explore page`);
    }
  }

  console.log(communities);
  
  

  useEffect(() => {
    getCommunities()
  },[location])
  return (
    <div className='w-full h-full flex flex-wrap gap-3 px-6 py-4 overflow-x-hidden overflow-y-scroll'>
      {/* explore cards */}
      {
        communities?.length > 0 && communities.map((community,index) => {
          return <CommunityCard key={index} communitydata={community} />
        })
      }
    </div>
  )
}

export default Explore