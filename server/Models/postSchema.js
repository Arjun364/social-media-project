const mongoose = require("mongoose") // import the mongoose
// structure of the postSchema
const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    dateofcreation: {
        type: String,
        required: true
    },
    postType:{
        type: String,
        required: true,
        default:"Text"
    },
    discription: {
        type: String,
        default:""
    },
    postmedia:{
        type: String,
    },
    link:{
        type: String,
        default:""
    },
    likes:{
        type: Array,
        default:[]
    },
    comments:{
        type: Array,
        default:[]
    },
    creator: {
        username:{
            type: String,
            required: true
        },
        userid: {
            type: String,
            required: true
        },
        userImg:{
            type: String,
            required: true
        },
        communityname:{
            type: String,
            required: true
        },
        communityid: {
            type: String,
            required: true
        },
        communityImg:{
            type: String,
            required: true
        }
    },
})
// declare the model
const posts = mongoose.model("posts", postSchema)
// export the model
module.exports = posts