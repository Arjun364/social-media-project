// logic for the posts
const mongoose = require('mongoose');
const communities = require('../Models/communitySchema');
const posts = require('../Models/postSchema'); // import the model
const users = require('../Models/userSchema');

//  let create a logic for creating a post in the database
exports.createpost = async (req, res) => {
    console.log(`inside the create post route`);
    const { title, postType, discription, link, userid } = req.body
    const postMedia = req.files["postMedia"] ? req.files["postMedia"][0].path : null;
    const { communityid } = req.params
    console.log(title, postType, discription, link ,postMedia,communityid);
    // logic starts
    try {
        // let check if the required fields are present
        if (!title || !postType  || !communityid) {
            console.log(`Title, Post Type and Community ID are required`);
            return res.status(400).json({ message: "All fields are required" });
        }

        //let check if the user is present in the database
        const existinguser = await users.findById(userid)
        if (!existinguser) {
            return res.status(401).json({ message: "User not found" });
        }

        // let check if the community id is present in the database
        const existingcommunity = await communities.findById(communityid)
        if (!existingcommunity) {
            return res.status(401).json({ message: "Community not found" });
        }

        console.log(existinguser,existingcommunity);

        // let set the date of the post 
        const dateData = new Date()
        const month = dateData.getMonth() + 1
        const year = dateData.getFullYear()
        const date = dateData.getDate()
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthName = monthNames[month - 1];
        const dateTime = `${date} ${monthName},${year}`

        // let create a new post in the database
        const newpost = new posts({
            title: title,
            postType: postType,
            dateofcreation: dateTime,
            discription: discription,
            link: link,
            postmedia: postMedia,
            communityid: communityid,
            creator: {
                userid: existinguser._id,
                username: existinguser.username,
                userImg: existinguser.profilePic,
                communityid: existingcommunity._id,
                communityname: existingcommunity.name,
                communityImg: existingcommunity.communitiyIcon
            }
        })

        // let increase the post karams in the user
        existinguser.karmas.post +=1
        await existinguser.save(); 
        // let save the new post in the database
        const savedpost = await newpost.save()
        // let return the new post in the response
        return res.status(200).json({ message: "Post created successfully", post: savedpost });
        
    } catch (err) {
        console.log(`Error creating post: ${err}`);
        return res.status(500).json({ message: "Error in creating post" });
    }   
}

//  to fetch the full detail of the posts of a user using the user id
exports.getuserposts = async (req, res) => {
    console.log(`inside the get posts route`);
    const { userid } = req.params
    console.log(userid);
    // logic starts
    try {
        // let check if the user id is present in the database
        const existinguser = await users.findById(userid)
        if (!existinguser) {
            return res.status(401).json({ message: "User not found" });
        }

        // let fetch the user created posts
        const userposts = await posts.find({ 'creator.userid': userid });
        if (userposts.length == 0) {
            return res.status(201).json({ message: "No user posts found", posts: userposts });
        } else {
            return res.status(200).json({ message: "User posts fetched successfully", posts: userposts });
        }
        
        
    } catch (err) {
        console.log(`Error fetching the user created posts: ${err}`);
        return res.status(500).json({ message: "error fetching the user created posts" });
    }

}

// commments 
//  to create a comment on a post
exports.createcomment = async (req, res) => {
    console.log(`inside the create comment route`);
    const {postid,comment,userid} = req.body
    console.log(postid,comment,userid);
    // logic starts
    try {
        // let check if the post id is present in the database
        const existingpost = await posts.findById(postid)
        if (!existingpost) {
            return res.status(401).json({ message: "Post not found" });
        }

        // let check if the user id is present in the database
        const existinguser = await users.findById(userid)
        if (!existinguser) {
            return res.status(401).json({ message: "User not found" });
        }

        // let check if the comment is present
        if (!comment) {
            return res.status(400).json({ message: "Comment is required" });
        }

        // let create comment in the post 
        existingpost.comments.push({
            userid: existinguser._id,
            username: existinguser.username,
            userImg: existinguser.profilePic,
            comment: comment
        })

        // let increase the comment karams in the user
        existinguser.karmas.comment +=1
        await existinguser.save(); 
        // let save the new comment in the database
        const savedcomment = await existingpost.save()

        // let return the new comment in the response
        return res.status(200).json({ message: "Comment created successfully", comment: savedcomment });
        
    } catch (error) {
        console.log(`Error createing comment: ${err}`);
        return res.status(500).json({ message: "error in  createing comment" });
    }
}

// to get the full comments of the a specfic post
exports.getpostcomments = async (req, res) => {
    console.log(`inside the get post comments route`);
    const { postid } = req.params
    console.log(postid);
    // logic starts 
    try {
        // let check if the post id is present in the database
        const existingpost = await posts.findById(postid)
        if (!existingpost) {
            return res.status(401).json({ message: "Post not found" });
        }

        // let fetch the post comments
        const postcomments = existingpost.comments
        if (postcomments.length == 0) {
            return res.status(201).json({ message: "No post comments found", comments: postcomments });
        } else {
            return res.status(200).json({ message: "Post comments fetched successfully", comments: postcomments });
        }
        
    } catch (error) {
        console.log(`Error fetching the post comments: ${err}`);
        return res.status(500).json({ message: "error fetching the post comments" });
    }
}

// to fetch the full detail of the posts of a community using the community id
exports.getcommunityposts = async (req, res) => {
    console.log(`inside the get community posts route`);
    const { communityid } = req.params
    console.log(communityid);
    // logic starts
    try {
        // let check if the community is given 
        if (!communityid) {
            return res.status(400).json({ message: "Community ID is required" });
        }
        // let check if the community id is present in the database
        const existingcommunity = await communities.findById(communityid)
        if (!existingcommunity) {
            return res.status(401).json({ message: "Community not found" });
        }

        // let fetch the community posts
        const communityposts = await posts.find({ 'creator.communityid': communityid });
        if (communityposts.length == 0) {
            return res.status(201).json({ message: "No community posts found", posts: communityposts });
        } else {
            return res.status(200).json({ message: "Community posts fetched successfully", posts: communityposts });
        }

    } catch (error) {
        console.log(`Error fetching community posts: ${error}`);
        return res.status(500).json({ message: "error fetching community posts" });
    }
}



