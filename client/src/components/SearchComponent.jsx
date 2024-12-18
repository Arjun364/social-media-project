import React, { useEffect, useState } from 'react'
// images
import img from '../assets/avatar1.jpg'
// icons
import { IoSearch } from "react-icons/io5";
import { getsearchedcommunitiesAPI } from '../services/allAPIs';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../services/serverUrl';

const SearchComponent = ({ visible }) => {
    const navigate = useNavigate()
    const [selected, setSelected] = useState(false)
    const [search, setSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [searchedItems, setSearchedItems] = useState([])

    // Debounce the search term
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300); // Adjust the delay (in ms) as needed

        return () => {
            clearTimeout(handler); // Clear timeout on cleanup
        };
    }, [search]);

    const getCommunity = async () => {
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
            if (currentuser.userid && userToken && search.length > 0) {
                // let create the reheader
                const reqheader = {
                    "Authorization": `Bearer ${userToken}`,
                }

                // make the api call
                const result = await getsearchedcommunitiesAPI(search, reqheader)
                console.log(result);
                // let set condition 
                if (result.status >= 200 && result.status <= 299) {
                    setSearchedItems(result.data.communities)
                } else {
                    setSearchedItems([])
                }

            }

        } catch (error) {
            console.log(`error in getting community: ${error}`);

        }
    }

    useEffect(() => {
        getCommunity()
    }, [debouncedSearch])

    return (
        <div className='flex flex-col relative z-50'>
            <div className={`${visible ? 'flex' : 'hidden'} md:w-[20rem] lg:w-[40rem] md:flex bg-slate-200 px-5 py-1 rounded-full gap-2 items-center`}>
                <IoSearch className='text-[1.2rem] text-slate-600' />
                <input type="text" className='txtbox2' placeholder='Search' onChange={(e) => setSearch(e.target.value)} onFocus={() => setSelected(true)} />
            </div>
            {/* the search section */}
            <div className={`${selected ? 'flex' : 'hidden'}  flex-col gap-1 p-2 w-full max-h-[14rem]  md:w-[20rem] lg:w-[40rem] bg-slate-200 absolute top-[3.5rem] rounded-md`}>
                {/* options */}
                {
                    searchedItems?.length > 0 ? searchedItems.map((item, index) => {
                        return (
                            <div className='w-full flex items-center gap-3 border border-solid hover:shadow-md hover:bg-slate-100  cursor-pointer rounded-md  p-1 transition-all ease-linear duration-150 '
                                onClick={() => { navigate(`/community/${item._id}`), setSelected(false) }} key={index}>
                                <img src={`${serverUrl}/${item.communitiyIcon}`} alt="community image" className='w-[2.5rem] h-[2.5rem] bg-slate-500 rounded-full object-cover' />
                                <h4 className='text-[16px] font-medium'>{item.name}</h4>
                            </div>
                        )
                    }) : <h5 className='text-center'>No results found</h5>
                }
            </div>
        </div>
    )
}

export default SearchComponent