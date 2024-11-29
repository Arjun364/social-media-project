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