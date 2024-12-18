// 1 load the .env file : it is given first to load it first since the authincation has to be done btw the server and the clinet berfore any thing
require('dotenv').config();
const path = require('path');
// import the express framwork
const express = require('express')
// import the router
const router = require('./Router/router')
// import cors to connect between the server host and client host
const cors =require('cors')
// create a server using express
const server = express()
// middlewares for the server
server.use(cors({
    origin:[
        'http://localhost:5173',
        'https://social-media-project-fz2u.onrender.com'
    ]

}))
server.use(express.json())
server.use(router)
// create a port for the server to run :4000
const PORT = process.env.PORT || 4000
// import the mongodb connection to the server
require('./DB/connections')
// Serve static files from the 'uploads' folder
server.use('/uploads', express.static(path.join(__dirname, 'Uploads')));

// default API port
server.get('/',(req,res)=>{
    res.status(200).send(`Welcome to the Server , PORT is ${PORT}`)
})

// listening the server
server.listen((PORT),()=>{
    console.log(`The server is listening in the PORT: ${PORT}`);
})
