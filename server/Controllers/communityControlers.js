// logic for the communities
const users = require('../Models/userSchema') // import the model
const posts = require('../Models/postSchema'); // import the model
const communities = require('../Models/communitySchema');



// to create a community
exports.createcommunity = async (req, res) => {
    console.log(`inside the create community details route`);
    const { name, community, ismature, title, content, username, userid } = req.body
    const icon = req.files["icon"]
    const banner = req.files["banner"]
    console.log(name, community, ismature, title, content, username, userid)
    // logic starts
    try {
        // let check if there is every field is present
        if (!name || !community || !ismature || !title || !content || !username || !userid || !icon || !banner) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // let check if there is a community name present in the database
        const existingcommunity = await communities.findOne({ name })
        if (existingcommunity) {
            return res.status(301).send({ message: "The community name is already taken. Please choose a different name." })
        }

        // let assign the date in which the database is created
        const dateData = new Date()
        // let take the month and year of the date
        const month = dateData.getMonth() + 1
        let year = dateData.getFullYear()

        // let assign month name to the month number
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthName = monthNames[month - 1];
        // let assign the date in which the database is created

        // let take the year last 2 digits
        year = year.toString().slice(-2)
        const today = `created ${monthName} ${year}`

        // let take the userimage form the users database on base on the userid
        const user = await users.findById(userid)
        const userimage = user.profilePic


        // create a new community document
        const newcommunity = new communities({
            name,
            type: {
                community,
                ismature
            },
            dateofcreation: today,
            description: {
                title,
                content
            },
            creator: {
                username,
                userid
            },
            members: [
                {
                    username,
                    userid,
                    usertype: "moderator",
                    userimage
                }
            ],
            communitiyIcon: icon ? icon[0].path : "",
            communityBanner: banner ? banner[0].path : "",
        });

        // save the community document to the database
        const savedcommunity = await newcommunity.save();
        console.log(savedcommunity);

        return res.status(200).json({ message: "The community created successfully.", community: savedcommunity }); // Send the community data in response
    } catch (err) {
        console.error("Error creating community:", err);
        return res.status(500).json({ message: "Error creating community" });
    }
}

// to fetch the communities made by the  user 
exports.getcommunities = async (req, res) => {
    console.log(`inside the get current user communities route`);
    const { userid } = req.params
    console.log({ userid });
    // logic starts
    try {
        // let check if the user id is present or not
        if (!userid) {
            return res.status(400).json({ message: "User ID is required" });
        }
        // let check if the user id is present in the database
        const existinguser = await users.findById(userid)
        if (!existinguser) {
            return res.status(401).json({ message: "User not found" });
        }

        // let fetch the user created communities
        const usercommunities = await communities.find({ 'creator.userid': userid }, { _id: 1, name: 1, communitiyIcon: 1, }); // only the required data is fetched to the communities
        if (usercommunities.length == 0) {
            return res.status(201).json({ message: "No user communities found", communities: usercommunities });
        } else {
            return res.status(200).json({ message: "User communities fetched successfully", communities: usercommunities });
        }
    } catch (err) {
        console.error("Error fetching the user created  communities:", err);
        return res.status(500).json({ message: "Error in fetching the user created community" });
    }
}


// to fetch the full detail of the community using the community id
exports.getcommunity = async (req, res) => {
    console.log(`inside the get community details route`);
    const { communityid } = req.params
    console.log(communityid);
    // logic starts
    try {
        // let check if the community id is present or not
        if (!communityid) {
            return res.status(400).json({ message: "Community ID is required" });
        }
        // let check if the community id is present in the database
        const existingcommunity = await communities.findById(communityid)
        if (!existingcommunity) {
            return res.status(401).json({ message: "Community not found" });
        }
        return res.status(200).json({ message: "Community details fetched successfully", community: existingcommunity });

    } catch (err) {
        console.error("Error fetching communitydetails:", err);
        return res.status(500).json({ message: "Error in fetching communitydetails" });
    }
}

// let set a funtion to add users to the membersection in the community
exports.joincommunity = async (req, res) => {
    console.log(`inside the join to the community`);
    const { communityid } = req.params
    const { userid } = req.body
    console.log(communityid);
    console.log(`userid : ${userid}`);

    // logic starts
    try {
        // let check if the community id is present or not
        if (!communityid) {
            return res.status(400).json({ message: "Community ID is required" });
        }
        // let check if the user id is present or not
        if (!userid) {
            return res.status(400).json({ message: "User ID is required" });
        }
        // let check if the community id is present in the database
        const existingcommunity = await communities.findById(communityid)
        if (!existingcommunity) {
            return res.status(401).json({ message: "Community not found" });
        }
        // let check if the user id is present in the database
        const existinguser = await users.findById(userid)
        if (!existinguser) {
            return res.status(401).json({ message: "User not found" });
        }

        if (existingcommunity && existinguser) {
            console.log(`both the user and community is present`);
            // let check if the user is already a member in the community
            const existinguserincommunity = await communities.findOne({ _id: communityid, 'members.userid': userid })
            if (existinguserincommunity) {
                return res.status(201).json({ message: "User is already a member in the community" });
            }
            // let add the community to the following section of the user
            existinguser.following.push({ communityid: communityid, communityname: existingcommunity.name, communityimage: existingcommunity.communitiyIcon });
            await existinguser.save();

            // let add the user to the community
            existingcommunity.members.push({ username: existinguser.username, userid: existinguser._id.toString(), usertype: "member", userimage: existinguser.profilePic });
            await existingcommunity.save();
            return res.status(200).json({ message: "User joined the community successfully", community: existingcommunity, user: existinguser });
        }

    } catch (error) {
        console.error("Error joining the community:", err);
        return res.status(500).json({ message: "Error in joining the community" });
    }
}

// let set a funtion to remove the users from the membersection in the community
exports.leavecommunity = async (req, res) => {
    console.log(`inside the leave to the community`);
    const { communityid } = req.params;
    const { userid } = req.body;

    try {
        // Check if both communityid and userid are provided
        if (!communityid) {
            return res.status(400).json({ message: "Community ID is required" });
        }
        if (!userid) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Find community and user
        const existingcommunity = await communities.findById(communityid);
        if (!existingcommunity) {
            return res.status(404).json({ message: "Community not found" });
        }

        const existinguser = await users.findById(userid);
        if (!existinguser) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log(`Both user and community are present.`);

        // Check if the user is already a member of the community
        const isMember = existingcommunity.members.some(
            (member) => member.userid.toString() === userid
        );

        if (!isMember) {
            return res.status(400).json({ message: "User is not a member of the community" });
        }

        // Remove user from community members
        existingcommunity.members = existingcommunity.members.filter(
            (member) => member.userid.toString() !== userid
        );
        await existingcommunity.save();

        // Remove community from user's following list
        existinguser.following = existinguser.following.filter(
            (following) => following.communityid.toString() !== communityid
        );
        await existinguser.save();

        // Fetch updated documents
        const updatedCommunity = await communities.findById(communityid);
        const updatedUser = await users.findById(userid);

        // Respond with updated data
        return res.status(200).json({
            message: "User left the community successfully",
            community: updatedCommunity,
            user: updatedUser,
        });
    } catch (err) {
        console.error("Error removing from the community:", err);
        return res.status(500).json({ message: "Error in removing from the community" });
    }
};

// to get every community posts of the current user present
exports.getusercommunities = async (req, res) => {
    console.log(`inside the get user communities route`);
    const { userid } = req.params
    console.log(userid);
    // let start the logic
    try {
        // let check if the user id is present or not
        if (!userid) {
            return res.status(400).json({ message: "User ID is required" });
        }
        // let check if the user id is present in the database
        const existinguser = await users.findById(userid)
        if (!existinguser) {
            return res.status(401).json({ message: "User not found" });
        }

        // let fetch the user communities ids
        const userCommunities = await communities.find({ 'members.userid': userid }, { _id: 1 }); // only the required data is fetched to the communities
        // let check the length of the communities
        if (userCommunities.length === 0) {
            return res.status(200).json({
                message: "No user communities found",
                communities: [],
                posts: []
            });
        }

        // Extract community IDs
        const communityIds = userCommunities.map((community) => community._id.toString());

        // Fetch posts related to these communities
        const communityPosts = await posts.find({ "creator.communityid": { $in: communityIds } });

        // Response
        return res.status(200).json({
            message: "User homepage posts fetched successfully",
            posts: communityPosts,
        });

    } catch (err) {
        console.error("Error in fetching user communities:", err);
        return res.status(500).json({ message: "Error in fetching user communities" });
    }

}

// to every communtiy details in the user explore page 
exports.getEveryCommunities = async (req, res) => {
    console.log(`inside the get every communities route`);
    try {
        // Fetch required fields from all communities
        const allCommunities = await communities.find({}, { 
            _id: 1, 
            name: 1, 
            communitiyIcon: 1,
            communityBanner: 1, 
            creator: 1,
            description: 1
        });

        // Response based on the result
        if (allCommunities.length === 0) {
            return res.status(200).json({ 
                message: "No communities found", 
                communities: [] 
            });
        }
        
        return res.status(200).json({ 
            message: "Communities fetched successfully", 
            communities: allCommunities 
        });
    } catch (err) {
        console.error("Error in fetching every community details:", err.stack);
        return res.status(500).json({ 
            message: "Error in fetching every community details" 
        });
    }
};

// to get the searched community details
exports.getsearchedcommunities = async (req, res) => {
    console.log(`inside the get searched communities route`);
    const { communityname } = req.params
    console.log(communityname);
    try {
        // let check if the community name is present or not
        if (!communityname) {
            return res.status(400).json({ message: "Community name is required" });
        }
        // let fetch the community details
        const searchedcommunities = await communities.find({ name: { $regex: communityname, $options: "i" } }, { _id: 1, name: 1, communitiyIcon: 1});
        console.log(searchedcommunities);

        // Response based on the result
        if (searchedcommunities.length === 0) {
            return res.status(200).json({ 
                message: "No communities found", 
                communities: [] 
            });
        }
        
        return res.status(200).json({ 
            message: "Communities fetched successfully", 
            communities: searchedcommunities 
        });
        
    } catch (err) {
        console.error("Error in fetching every community details:", err.stack);
        return res.status(500).json({ 
            message: "Error in fetching every community details" 
        });
    }
}
