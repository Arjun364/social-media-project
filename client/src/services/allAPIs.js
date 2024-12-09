import { commonAPI } from "./commonAPI"
import { serverUrl } from "./serverUrl"

// example for api struture - getVideoAPI is a function and commonAPI is the basic struture of the API and the server url is the url for the hosted server
// export const getVideoAPI =async()=>{
//     return await commonAPI('get',`${serverUrl}/videos`,{})
// }

// authientication api request
// registration
export const registrationAPI =async(reqbody)=>{
    return await commonAPI('post',`${serverUrl}/registration`,reqbody,"")
}
// login 
export const loginAPI =async(reqbody)=>{
    return await commonAPI('post',`${serverUrl}/login`,reqbody,"")
}

// get user data base on the id
export const getuserApi =async(userid,reqheader)=>{
    return await commonAPI('get',`${serverUrl}/user/${userid}`,"",reqheader)
}

// update user profile 
export const updateuserprofileApi =async(userid,reqbody,reqheader)=>{
    return await commonAPI('put',`${serverUrl}/userprofile/${userid}`,reqbody,reqheader)
}

// update user account 
export const updateuseraccountApi =async(userid,reqbody,reqheader)=>{
    return await commonAPI('put',`${serverUrl}/useraccount/${userid}`,reqbody,reqheader)
}

// to fetch the user community following list
export const getuserfollowinglistAPI =async(userid,reqheader)=>{
    return await commonAPI('get',`${serverUrl}/userFollowingList/${userid}`,"",reqheader)
} 

// delete user account
export const deleteuseraccountAPI =async(userid,reqheader)=>{
    return await commonAPI('delete',`${serverUrl}/user/${userid}`,"",reqheader)
}


// community APIs--------------------------------------------------------------------------------
// create community
export const createcommunityAPI =async(reqbody,reqheader)=>{
    return await commonAPI('post',`${serverUrl}/addcommunity`,reqbody,reqheader)
}

// get community created by the user 
export const getusercommunitiesAPI =async(userid,reqheader)=>{
    return await commonAPI('get',`${serverUrl}/communities/${userid}`,"",reqheader)
}

// get the full details of the communtity 
export const getcommunityDetailsAPI = async(communityid,reqheader)=>{
    return await commonAPI('get',`${serverUrl}/community/${communityid}`,"",reqheader)
} 

// to let the user be join the community 
export const userjoincommunityAPI =async(communityid,reqbody,reqheader)=>{
    return await commonAPI('post',`${serverUrl}/joincommunity/${communityid}`,reqbody,reqheader)
}

// to let the user be leave the community 
export const userleavecommunityAPI =async(communityid,reqbody,reqheader)=>{
    return await commonAPI('post',`${serverUrl}/leavecommunity/${communityid}`,reqbody,reqheader)
}

// to let a user create a post in the community 
export const createpostAPI =async(communityid,reqbody,reqheader)=>{
    return await commonAPI('post',`${serverUrl}/createpost/${communityid}`,reqbody,reqheader)
}

//  to get a user created posts details
export const getuserpostsAPI =async(userid,reqheader)=>{
    return await commonAPI('get',`${serverUrl}/getuserposts/${userid}`,"",reqheader)
}

//  to create a comment on a post 
export const createcommentAPI =async(reqbody,reqheader)=>{
    return await commonAPI('post',`${serverUrl}/createcomment`,reqbody,reqheader)
}

//  to fetch the comments of a post 
export const getpostcommentsAPI =async(postid,reqheader)=>{
    return await commonAPI('get',`${serverUrl}/getpostcomments/${postid}`,"",reqheader)
}
