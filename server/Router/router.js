// import the express 
const express = require('express')

const userController =require('../Controllers/userControlers') //imported the usercontrollers to the router
const communityController =require('../Controllers/communityControlers') // imported the communitycontrollers to the router
const jwtMiddleware =require('../MiddleWares/jwtMiddleware') // imported the jwt middleware to the router
const upload =require('../MiddleWares/multerMiddleware')

const router = express.Router() //created router
// create routes for each request
// user routes -------------------------------------------------------
// post routes 
router.post('/registration',userController.register) //registration request 
router.post('/login',userController.login) // login request

// get routes
router.get(`/user/:userid`,jwtMiddleware,userController.getuser) //fetch the specific user details
router.get(`/userFollowingList/:userid`,jwtMiddleware,userController.getuserfollowinglist) //fetch the specific user following list

// put routes
router.put(`/userprofile/:userid`,upload.fields([{ name: "profilePic", maxCount: 1 },{ name: "bannerPic", maxCount: 1 },]),jwtMiddleware,userController.updateuserprofile) //update the user profile details
router.put(`/useraccount/:userid`,jwtMiddleware,userController.updateuseraccount) //update the user account details

// delete routes
router.delete(`/user/:userid`,jwtMiddleware,userController.deleteuseraccount) //delete the user details

// communties routes---------------------------------------------------------
// post routes
router.post(`/addcommunity`,upload.fields([{ name: "icon", maxCount: 1 },{ name: "banner", maxCount: 1 }]),jwtMiddleware,communityController.createcommunity) // create a new communitydetails
router.post(`/joincommunity/:communityid`,jwtMiddleware,communityController.joincommunity) // to set the user to be join in the community as the member

// get routes
router.get(`/communities/:userid`,jwtMiddleware,communityController.getcommunities) // fetch the specific users community details
router.get(`/community/:communityid`,jwtMiddleware,communityController.getcommunity) // fetch the specific community details

// export the router
module.exports = router