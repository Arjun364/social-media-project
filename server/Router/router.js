// import the express 
const express = require('express')

const userController =require('../Controllers/userControlers') //imported the userSchema to the router

const router = express.Router() //created router
// create routes for each request
// post routes 
router.post('/registration',userController.register) //registration request 
router.post('/login',userController.login) // login request

// export the router
module.exports = router
