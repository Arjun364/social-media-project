import React, { useEffect, useState } from 'react';
import { gethomepostsAPI } from '../../services/allAPIs';
import Post from './Post';
import { useLocation, useParams } from 'react-router-dom';

const Home = ({section}) => {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const getTheHomeposts = async () => {
    try {
      // if the user is not the moderator then use the join function 
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

        // make the api call
        const result = await gethomepostsAPI(currentuser.userid, reqheader)
        // console.log(result);
        // let set response 
        if (result.status >= 200 && result.status <=299) {
          console.log(`fetches the home posts successfully`);
          setPosts(result.data.posts)
        }else{
          console.log(`Error in fetching the home posts`);
          setPosts([])
        }
      }
    } catch (err) {
      console.log(`Error in fetching the home posts`);
    }
  };

  useEffect(() => {
    getTheHomeposts();
  },[section,location])

  // console.log(posts);
  
  return (
    <div className="w-full h-full flex flex-col gap-3 px-6 py-4 overflow-x-hidden overflow-y-scroll">
      {/* post section  */}
      {
        posts.length > 0 ? 
        posts.map((post,index) => (
          <Post key={index} postdata={post} />
        )) 
        :"There is no post available"
      }
    </div>
  );
};

export default Home;
