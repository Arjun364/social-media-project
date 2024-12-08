import { getuserApi } from '../services/allAPIs'; // import the getuserApi function
import { useAuth } from '../routes/AuthContext'; // import the useAuth hook

export const fetchUserData = async (userid) => {
    try {
        const currentuser = userid 
        // Function to extract a specific cookie value
        const getCookie = (cookieName) => {
            const cookies = document.cookie.split('; ');
            const cookie = cookies.find(row => row.startsWith(`${cookieName}=`));
            return cookie ? cookie.split('=')[1] : null;
        };

        // Fetch the user token from cookies
        const userToken = getCookie('userToken');

        if (currentuser && userToken) {
            // console.log(`current userid :${currentuser.userid} and current usertoken :${userToken}`);

            const reqheader = {
                "Authorization": `Bearer ${userToken}`
            }

            // let call the get user api 
            const result = await getuserApi(currentuser, reqheader)
            // console.log(result);

            if (result.status>=200 &&result.status<=299) {
                // returning the fetched data
                const {data} = result
                return data
            }else{
                console.log(`error in fetching the data`);  
            }

        } else if (!userToken) {
            // if the usertoken is not presnt then the user is logged out sied
            const { logout } = useAuth()
            logout()
        }
    } catch (err) {
        console.error(`error in fetching the current user data :${err}`);
    }
}