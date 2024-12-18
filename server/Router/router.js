// import the express 
const express = require('express')

const userController =require('../Controllers/userControlers') //imported the usercontrollers to the router
const communityController =require('../Controllers/communityControlers') // imported the communitycontrollers to the router
const postController =require('../Controllers/postscontroler') // imported the postcontrollers to the router
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
router.post(`/addcommunity`,jwtMiddleware,upload.fields([{ name: "icon", maxCount: 1 },{ name: "banner", maxCount: 1 }]),communityController.createcommunity) // create a new communitydetails
router.post(`/joincommunity/:communityid`,jwtMiddleware,communityController.joincommunity) // to set the user to be join in the community as the member
router.post(`/leavecommunity/:communityid`,jwtMiddleware,communityController.leavecommunity) // to set the user to be leave in the community

// get routes
router.get(`/communities/:userid`,jwtMiddleware,communityController.getcommunities) // fetch the specific users community details
router.get(`/community/:communityid`,jwtMiddleware,communityController.getcommunity) // fetch the specific community details
router.get(`/gethomeposts/:userid`,jwtMiddleware,communityController.getusercommunities) // to get every community ids of the current user
router.get(`/geteverycommunity`,jwtMiddleware,communityController.getEveryCommunities) // to get every community details
router.get(`/getsearchedcommunities/:communityname`,jwtMiddleware,communityController.getsearchedcommunities) // to get the searched community details

//  posts section routes ---------------------------------------------------------------------
// post routes
router.post(`/createpost/:communityid`,jwtMiddleware,upload.fields([{ name: "postMedia", maxCount: 1 }]),postController.createpost) // create a new post in the database
router.post(`/createcomment`,jwtMiddleware,postController.createcomment) // create a new comment in the database
// get routes
router.get(`/getuserposts/:userid`,jwtMiddleware,postController.getuserposts) // fetch the specific users post details
router.get(`/getpostcomments/:postid`,jwtMiddleware,postController.getpostcomments) // fetch the specific community post details
router.get(`/getcommunityposts/:communityid`,jwtMiddleware,postController.getcommunityposts) // fetch the specific community post details
// export the router
module.exports = router