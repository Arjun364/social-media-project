import React, { useState, useEffect } from 'react'
import { Modal, Button, FloatingLabel, FileInput, Label } from "flowbite-react";
// icons
import { IoIosArrowForward, IoIosCloudUpload } from "react-icons/io";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
// apis
import { getuserApi, updateuserprofileApi } from '../../../services/allAPIs';


const ProfileSettings = () => {
  const [profileDetails, setProfileDetails] = useState({
    displayname: "arjun",
    description: "",
    avatar: null,
    banner: null,
  })

  const [initialDetails, setInitialDetails] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [option, setoption] = useState("")
  const [avatarPreview, setavatarPreview] = useState()
  const [bannerPreview, setbannerPreview] = useState()

  // Check if any details are modified
  const isChanged = JSON.stringify(initialDetails) !== JSON.stringify(profileDetails);
  const handlemodal = (option) => {
    setOpenModal('true')
    setoption(option)
    setInitialDetails({ ...profileDetails });
  }

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const currentUser = JSON.parse(sessionStorage.getItem("user"));

      const getCookie = (cookieName) => {
        const cookies = document.cookie.split("; ");
        const cookie = cookies.find((row) => row.startsWith(`${cookieName}=`));
        return cookie ? cookie.split("=")[1] : null;
      };

      const userToken = getCookie("userToken");

      if (currentUser && userToken) {
        const reqHeader = { Authorization: `Bearer ${userToken}` };
        const result = await getuserApi(currentUser.userid, reqHeader);

        if (result.status >= 200 && result.status <= 299) {
          setProfileDetails({
            displayname: result.data.user.displayname,
            description: result.data.user.description,
            avatar: result.data.user.profilePic,
            banner: result.data.user.bannerPic,
          });
        } else {
          console.error("Error fetching user data");
        }
      } else if (!userToken) {
        console.error("User not logged in. Token missing.");
      }
    } catch (err) {
      console.error(`Error fetching user data: ${err}`);
    }
  };



  // Update profile details
  const handleProfileUpdate = async () => {
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
  
      // Prepare form data for avatar and banner uploads
      const formData = new FormData();
      formData.append("displayname", profileDetails.displayname);
      formData.append("description", profileDetails.description);
      if (profileDetails.avatar instanceof File) {
        formData.append("profilePic", profileDetails.avatar);
      }
      if (profileDetails.banner instanceof File) {
        formData.append("bannerPic", profileDetails.banner);
      }
  
      const response = await updateuserprofileApi(currentUser.userid, formData, reqHeader);
  
      if (response.status >= 200 && response.status <= 299) {
        console.log("Profile updated successfully.");
        setProfileDetails({
          ...profileDetails,
          avatar: response.data.user.profilePic,
          banner: response.data.user.bannerPic,
        });
        setOpenModal(false);
      } else {
        console.error("Error updating profile.");
      }
    } catch (err) {
      console.error(`Error updating profile: ${err}`);
    }
  };

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <div className='w-full h-[40rem] overflow-x-hidden overflow-y-scroll flex flex-col gap-3'>
      {/* <!-- Section Title --> */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">General</h2>
      {/* settings items */}
      <div className="divide-y divide-gray-200 bg-white rounded-lg shadow">
        {/* <!-- display name--> */}
        <div className="group hover:cursor-pointer flex justify-between items-center py-4 px-6" onClick={() => handlemodal("displayname")}>
          <div>
            <p className="text-gray-800 font-medium">Display name</p>
            <p className="text-gray-500 text-sm">changing your displayname doesnt changes your username</p>
          </div>
          <div className='flex items-center gap-2'>
            <p className='text-slate-500'>{profileDetails.displayname}</p>
            <button type="button" className="p-3 rounded-full bg-transparent group-hover:bg-slate-200 transition-colors">
              <IoIosArrowForward className="text-[1.3rem] text-slate-500" />
            </button>
          </div>
        </div>

        {/* <!-- about description-> */}
        <div className="group hover:cursor-pointer flex justify-between items-center py-4 px-6" onClick={() => handlemodal("description")}>
          <div>
            <p className="text-gray-800 font-medium">About Description</p>
          </div>
          <div className='flex items-center gap-2'>
            <button type="button" className="p-3 rounded-full bg-transparent group-hover:bg-slate-200 transition-colors">
              <IoIosArrowForward className="text-[1.3rem] text-slate-500" />
            </button>
          </div>
        </div>

        {/* <!-- edit your avatar */}
        <div className="group hover:cursor-pointer flex justify-between items-center py-4 px-6" onClick={() => handlemodal("avatar")}>
          <div>
            <p className="text-gray-800 font-medium">Avatar</p>
            <p className="text-gray-500 text-sm">Edit your avatar</p>
          </div>
          <div className='flex items-center gap-2'>
            <button type="button" className="p-3 rounded-full bg-transparent group-hover:bg-slate-200 transition-colors">
              <IoIosArrowForward className="text-[1.3rem] text-slate-500" />
            </button>
          </div>
        </div>

        {/* <!-- edit your banner */}
        <div className="group hover:cursor-pointer flex justify-between items-center py-4 px-6" onClick={() => handlemodal("banner")}>
          <div>
            <p className="text-gray-800 font-medium">Banner</p>
            <p className="text-gray-500 text-sm">upload a profile backround image</p>
          </div>
          <div className='flex items-center gap-2'>
            <button type="button" className="p-3 rounded-full bg-transparent group-hover:bg-slate-200 transition-colors">
              <IoIosArrowForward className="text-[1.3rem] text-slate-500" />
            </button>
          </div>
        </div>


        {/* modla body */}
        <Modal show={openModal} size={"md"} onClose={() => setOpenModal(false)}>
          <Modal.Header>{option == "displayname" ? "Change display name" : ""}{option == "description" ? "About description" : ""}{option == "avatar" ? "Avatar" : ""}{option == "banner" ? "Banner" : ""}</Modal.Header>
          <Modal.Body>
            <div className='flex flex-col gap-2'>
              {/* displayname */}
              {
                option == "displayname" ?
                  <>
                    <p className='text-sm text-slate-600'>Changing your display name won't change your username</p>
                    <FloatingLabel variant="filled" label="Display name" value={profileDetails.displayname} onChange={(e) => setProfileDetails({ ...profileDetails, displayname: e.target.value })} />
                  </>
                  : ""
              }
              {/* description */}
              {
                option == "description" ?
                  <>
                    <p className='text-sm text-slate-600'>Give a brief description of yourself</p>
                    <FloatingLabel className='' variant="filled" label="About" value={profileDetails.description} onChange={(e) => setProfileDetails({ ...profileDetails, description: e.target.value })} />
                  </>
                  : ""
              }
              {/* updated avatar */}
              {
                option == "avatar" ?
                  <>
                    <p className='text-sm text-slate-600'>Update the avatar</p>
                    <div className="flex w-full items-center justify-center">
                      <Label
                        htmlFor="dropzone-file"
                        className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pb-6 pt-5">
                          {profileDetails.avatar ?
                            <img src={avatarPreview} className='w-[5rem] h-[5rem] rounded-full' />
                            : <IoIosCloudUpload className='text-[2.5rem] text-slate-500' />}
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <FileInput id="dropzone-file" className="hidden" accept="image/png, image/jpeg, image/gif, image/svg+xml" onChange={(e) => {
                          const file = e.target.files[0]
                          if (file) {
                            setProfileDetails({ ...profileDetails, avatar: file })
                            setavatarPreview(URL.createObjectURL(file))
                          }
                        }} />
                      </Label>
                    </div>
                  </>
                  : ""
              }
              {/* updated banner */}
              {
                option == "banner" ?
                  <>
                    <p className='text-sm text-slate-600'>Update the banner</p>
                    <div className="flex w-full items-center justify-center">
                      <Label
                        htmlFor="dropzone-file2"
                        className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pb-6 pt-5">
                          {profileDetails.banner ?
                            <img src={bannerPreview} className='w-full h-[8rem] ' />
                            : <IoIosCloudUpload className='text-[2.5rem] text-slate-500' />}
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <FileInput id="dropzone-file2" className="hidden" accept="image/png, image/jpeg, image/gif, image/svg+xml" onChange={(e) => {
                          const file = e.target.files[0]
                          if (file) {
                            setProfileDetails({ ...profileDetails, banner: file })
                            setbannerPreview(URL.createObjectURL(file))
                          }
                        }} />
                      </Label>
                    </div>
                  </>
                  : ""
              }
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              disabled={!isChanged} // Disable button if no changes
              onClick={handleProfileUpdate}>submit</Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Decline
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}

export default ProfileSettings