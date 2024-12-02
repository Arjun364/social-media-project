// import the express 
const express = require('express')

const userController =require('../Controllers/userControlers') //imported the userSchema to the router
const jwtMiddleware =require('../MiddleWares/jwtMiddleware') // imported the jwt middleware to the router
const upload =require('../MiddleWares/multerMiddleware')

const router = express.Router() //created router
// create routes for each request
// post routes 
router.post('/registration',userController.register) //registration request 
router.post('/login',userController.login) // login request

// get routes
router.get(`/user/:userid`,jwtMiddleware,userController.getuser) //fetch the specific user details

// put routes
router.put(`/userprofile/:userid`,upload.fields([{ name: "profilePic", maxCount: 1 },{ name: "bannerPic", maxCount: 1 },]),jwtMiddleware,userController.updateuserprofile) //update the user profile details
router.put(`/useraccount/:userid`,jwtMiddleware,userController.updateuseraccount) //update the user account details

// delete routes
router.delete(`/user/:userid`,jwtMiddleware,userController.deleteuseraccount) //delete the user details
// export the router
module.exports = router
