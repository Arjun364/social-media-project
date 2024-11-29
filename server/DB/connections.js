const mongoose = require('mongoose') // import the mongoose libray
const connectionString = process.env.ConnectionString // imported the connection string 

// connection define
mongoose.connect(connectionString).then((res)=>{
    console.log(`The server is connected to the mongoDB`);
}).catch((err)=>{
    console.log(`Mongoose Err :${err}`);
})

