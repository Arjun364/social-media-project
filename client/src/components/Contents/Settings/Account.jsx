import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../routes/AuthContext';
// flowbite
import { Button, Modal, FloatingLabel } from "flowbite-react";
// icons
import { IoIosArrowForward } from "react-icons/io";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { CiCircleInfo } from "react-icons/ci";
// alert libary
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteuseraccountAPI, updateuseraccountApi } from '../../../services/allAPIs';
import { fetchUserData } from '../../../utils/fetchuserdata';



const Account = () => {
    const [openModal, setOpenModal] = useState(false);
    const [opendelete, setOpenDelete] = useState(false);
    const [option, setoption] = useState(null)
    const [selectedOption, setSelectedOption] = useState("");

    const [accountDetails, setAccountDetails] = useState({
        email: "",
        password: "",
        gender: "",
    })
    const [letupdate, setletupdate] = useState({})
    const [itemToUpdate, setitemToUpdate] = useState(null)
    const [initialDetails, setInitialDetails] = useState(null);
    const [error, setError] = useState(null);


    const { logout } = useAuth();
    const options = [
        "Woman",
        "Man",
        "Non-binary",
        "I prefer not to say",
        "I refer to myself as...",
    ]

    const handleupdation = (updatingitem) => {
        setOpenModal(!openModal)
        setoption(updatingitem)
        setitemToUpdate(updatingitem)
        setInitialDetails({ ...accountDetails });

    }

    const handleitemupdation = async (item) => {
        try {
            console.log(letupdate);
            const currentuser = JSON.parse(sessionStorage.getItem('user'))
            // Function to extract a specific cookie value
            const getCookie = (cookieName) => {
                const cookies = document.cookie.split('; ');
                const cookie = cookies.find(row => row.startsWith(`${cookieName}=`));
                return cookie ? cookie.split('=')[1] : null;
            };

            // Fetch the user token from cookies
            const userToken = getCookie('userToken');

            if (currentuser && userToken) {
                const reqheader = {
                    "Authorization": `Bearer ${userToken}`
                }

                // let call the get user api 
                const result = await updateuseraccountApi(currentuser.userid,letupdate, reqheader)
                console.log(result);
                
                if (result.status >= 200 && result.status <= 299) {
                    // returning the fetched data
                    const { data } = result
                    setAccountDetails({
                        email: data.user.email,
                        password: data.user.displaypassword,
                        gender: data.user.gender
                    })
                    setOpenModal(false)
                } else if(result.status>=400 && result.status<=499){
                    setError(result.response.data.message)
                }
            }
            setletupdate(null)
        } catch (error) {
            console.log(error);
        }

    }

    const handleDelete = () => {
        setOpenDelete(true)
    }

    const handleAccountDelete = async () => {
        try {
            const currentUser = JSON.parse(sessionStorage.getItem("user"));

            if (!currentUser) {
                console.error("User not logged in.");
                return;
            }

            const getCookie = (cookieName) => {
                const cookies = document.cookie.split("; ");
                const cookie = cookies.find((row) => row.startsWith(`${cookieName}=`));
                return cookie ? cookie.split("=")[1] : null;
            };

            const userToken = getCookie("userToken");

            if (!userToken) {
                console.error("Token missing.");
                return;
            }

            const reqHeader = { Authorization: `Bearer ${userToken}` };

            const result = await deleteuseraccountAPI(currentUser.userid, reqHeader)

            if (result.status >= 200 && result.status <= 299) {
                console.log("Account Deleted");
                // for success registration
                toast.success(result.data.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })
                setTimeout(() => {
                    logout();
                }, 400);
            } else {
                console.log("error in deleting the account");
                toast.error(result.response.data.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                })
            }
            setOpenDelete(false)
        } catch (error) {
            console.error(error);
        }
    }

    // get user data
    useEffect(() => {
        const getuserdata = async () => {
            const result = await fetchUserData()
            if (result) {

            }

            setAccountDetails({
                email: result.user.email,
                password: result.user.displaypassword,
                gender: result.user.gender
            })
        }
        getuserdata()
    }, [])

    return (
        <div className='w-full h-[40rem] overflow-x-hidden overflow-y-scroll flex flex-col gap-3'>
            <ToastContainer />
            {/* <!-- Section Title --> */}
            <h2 className="text-xl font-semibold text-gray-800 mb-4">General</h2>
            {/* <!-- Settings Items --> */}
            <div className="divide-y divide-gray-200 bg-white rounded-lg shadow">
                {/* <!-- Email Address --> */}
                <div className="group hover:cursor-pointer flex justify-between items-center py-4 px-6" onClick={() => handleupdation('email')}>
                    <div>
                        <p className="text-gray-800 font-medium">Email address</p>
                        <p className="text-gray-500 text-sm">{accountDetails.email}</p>
                    </div>
                    <button
                        type="button"
                        className="p-3 rounded-full bg-transparent group-hover:bg-slate-200 transition-colors"
                    >
                        <IoIosArrowForward className="text-[1.3rem] text-slate-500" />
                    </button>
                </div>

                {/* <!-- password change --> */}
                <div className="group hover:cursor-pointer flex justify-between items-center py-4 px-6" onClick={() => handleupdation('pass')}>
                    <div>
                        <p className="text-gray-800 font-medium">Password</p>
                        <p className="text-gray-500 text-sm">{accountDetails.password}</p>
                    </div>
                    <button className='p-3 rounded-full bg-transparent group-hover:bg-slate-200 transition-colors' >
                        <IoIosArrowForward className='text-[1.3rem] text-slate-500' />
                    </button>
                </div>

                {/* <!-- Gender --> */}
                <div className="group hover:cursor-pointer flex justify-between items-center py-4 px-6" onClick={() => handleupdation('gender')}>
                    <div>
                        <p className="text-gray-800 font-medium">Gender</p>
                        <p className="text-gray-500 text-sm">{accountDetails.gender || "Not set"}</p>
                    </div>
                    <button className='p-3 rounded-full bg-transparent group-hover:bg-slate-200 transition-colors' >
                        <IoIosArrowForward className='text-[1.3rem] text-slate-500' />
                    </button>
                </div>
                {/* modal body */}
                <Modal show={openModal} onClose={() => setOpenModal(false)} size={"md"}>
                    <Modal.Header>{option == 'email' ? "Change your email address" : ""}{option == 'pass' ? "Change your password" : ""}{option == 'gender' ? "Gender" : ""}</Modal.Header>
                    <Modal.Body>
                        {option == "email" ?
                            <div className='w-full flex flex-col gap-2'>
                                <p className='text-sm'>Enter your new email address</p>
                                <input type="text" placeholder='Email address' onChange={(e) => setletupdate({ email: e.target.value })} className='txtbox' />
                                <p className='text-sm hidden text-red-600'>Error msg</p>
                            </div>
                            : ""}
                        {option == 'pass' ?
                            <div className='w-full flex flex-col gap-2'>
                                <label htmlFor="oldpass">
                                    <FloatingLabel variant="standard" label="Old password" onChange={(e) => setletupdate({ ...letupdate, oldpassword: e.target.value })} />
                                    <p className='text-sm hidden text-red-600'>Error msg</p>
                                </label>
                                <label htmlFor="newpass">
                                    <FloatingLabel variant="standard" label="New password" onChange={(e) => setletupdate({ ...letupdate, newpassword: e.target.value })} />
                                    <p className='text-sm hidden text-red-600'>Error msg</p>
                                </label>
                            </div>
                            :
                            ""}

                        {option == "gender" ?
                            <div className="w-full mx-auto">
                                <ul className="rounded-md overflow-hidden">
                                    {options.map((option) => (
                                        <li
                                            key={option}
                                            onClick={() => { setSelectedOption(option); setletupdate({ gender: option }) }}
                                            className={`px-4 py-2 cursor-pointer flex justify-between items-center 
                                     ${selectedOption === option ? "bg-blue-100" : "hover:bg-gray-100"}
                                   `}
                                        >
                                            <span>{option}</span>
                                            {selectedOption === option && (
                                                <span className="text-blue-500">✔</span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            : ""}
                            <p>{error}</p>

                    </Modal.Body>
                    <Modal.Footer className='text-right'>
                        <Button onClick={() => handleitemupdation(itemToUpdate)} >save changes</Button>
                        <Button color="gray" onClick={() => setOpenModal(false)}>
                            cancel
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
            {/* <!-- Section Title --> */}
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Advanced</h2>
            {/* <!-- delete account  --> */}
            <div className="group flex justify-between items-center py-4 px-6 hover:cursor-pointer" onClick={handleDelete}>
                <div>
                    <p className="text-gray-800 font-medium group-hover:text-red-500">Delete account</p>
                </div>
                <button>
                    <IoIosArrowForward className='text-[1.3rem] text-slate-500 group-hover:text-red-500' />
                </button>
            </div>
            {/* modal section */}
            <Modal show={opendelete} size="md" onClose={() => setOpenDelete(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center ">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this account?
                        </h3>
                        <p className='text-sm mb-1 flex items-center gap-2 justify-center text-red-500'><CiCircleInfo className='text-[1.4rem]' />it is a irreversable action</p>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={() => handleAccountDelete()}>
                                {"Delete"}
                            </Button>
                            <Button color="gray" onClick={() => setOpenDelete(false)}>
                                cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Account