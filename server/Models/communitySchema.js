const mongoose = require("mongoose") // import the mongoose
// structure of the communityschema
const communitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type:{
        community:{
            type: String,
            default:"Public",
            required: true
        },
        ismature: {
            type: Boolean,
            default:false,
            required: true
        }
    },
    dateofcreation: {
        type: String,
        required: true
    },
    description: {
       title:{
        type: String,
        default:"The community description title."
       } ,
       content:{
        type: String,
        default:"The community description content."
       }
    },
    members: {
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
        }
    },
    posts: {
        type: Array,
        default:[]
    },
    communitiyIcon: {
        type: String,
        default:""
    },
    communityBanner: {
        type: String,
        default:""
    },

})
// declaring the community
const communities = mongoose.model('communities', communitySchema)
module.exports = communities // exporting the communitySchema
