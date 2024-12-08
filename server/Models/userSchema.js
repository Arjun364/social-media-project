const mongoose = require("mongoose") // import the mongoose
// structure of the userschema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    displayname: {
        type: String,
    },
    description: {
        type: String,
        default:""
    },
    gender: {
        type: String,
        default:""
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    displaypassword: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required:true
    },
    profilePic: {
        type: String,
        default:'uploads/profiles/bg.jpg'
    },
    bannerPic: {
        type: String,
        default:"uploads/banners/magicpattern-65O4Dw6-xLg-unsplash.jpg"
    },
    karmas: {
        post: { type: Number, default: 0 },
        comment: { type: Number, default: 0 },
    },
    online: {
        type: Boolean,
        default: false,
    },
    following: [],
})
// declaring the user
const users = mongoose.model('users', userSchema)
module.exports = users // exporting the userSchema
