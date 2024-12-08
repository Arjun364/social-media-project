// logic for user APIs
const mongoose = require('mongoose'); // imported mongoose
const users = require('../Models/userSchema') // import the model
const JWT = require("jsonwebtoken") // importing the jWT for token generation
const argon2 = require('argon2') // import the argon libary for hashing th password

// registration logic
exports.register = async (req, res) => {
    console.log(`inside the registration controller`);
    const { username, email, password } = req.body
    console.log(username, email, password);
    // logic starts here
    try {
        // lets check it there is a user with username present in the database
        const existingUsernameUser = await users.findOne({ username })
        // lets check it there is a user with email present in the database
        const existingEmailUser = await users.findOne({ email })
        // let check if both of them are present
        if (existingUsernameUser && existingEmailUser) {
            return res.status(301).send({ message: "Both username and email are already taken. Please use different credentials." })
        } else if (existingUsernameUser) {
            // let check if the user name is prenet of not
            return res.status(302).send({ message: "The username is already taken. Please choose a different username." })
        } else if (existingEmailUser) {
            // let check if there is email present or not
            return res.status(303).send({ message: "The email is already in use. Please use a different email address." })
        }

        // to fetch the date only 
        const dateData = new Date()
        const today = dateData.toISOString().split('T')[0]

        // to make the display password of first 3 letters of the password and the rest will be *
        const displayPassword = password.slice(0, 3).concat("•".repeat(password.length - 3));

        // encrpting the password for security
        const hashedPassword = await argon2.hash(password)

        // if there is no user in name of username and email address then
        const newUser = new users({
            username: username,
            displayname: username,
            email: email,
            password: hashedPassword,
            displaypassword:displayPassword,
            role: "user",
            dob: today
        })

        // let save the user to database
        await newUser.save()
        // lets sent a response to the user saying the registration eas successufull.
        res.status(200).send({ message: "The Registration of user was successfull" })

    } catch (error) {
        console.error(`The registration error :${error}`);
        res.status(406).send({ message: "The registration error", error: error })
    }

}
// login logic of users
exports.login = async (req, res) => {
    console.log(`inside the login request`);
    const { username, password } = req.body
    console.log(username, password);
    // logic starts here
    try {
        const existinguser = await users.findOne({ username })
        // console.log(existinguser);
        if (existinguser) {
            // if the user is present check the password of the user is correct or not
            if (await argon2.verify(existinguser.password, password)) {
                console.log(`The user is present`);
                // Update the user's online state to true
                await users.findByIdAndUpdate(existinguser._id, { online: true });
                // creates a token for the user
                const token = JWT.sign({ userId: existinguser._id }, process.env.JWT_Key)
                return res.status(200).send({ user: { ...existinguser._doc, online: true }, token, message: "User has logged in successfully" }) // send a successfull response to the user with the token

            } else {
                // If the password doesnt matchs then 
                return res.status(401).send({ message: "Invalid username or password" })
            }
        } else {
            // if user is not founded in the database
            return res.status(402).send({ message: "There isnt any user present in this name" })
        }
    } catch (error) {
        console.error(`The login error: ${error}`);  // Log the error for debugging
        return res.status(406).send({ message: "The login error", error: error })
    }
}

// To get each users specific user details
exports.getuser = async (req, res) => {
    console.log(`inside the user route`);
    const { userid } = req.params
    console.log({ userid })
    // logic starts
    try {
        if (userid) {
            const existinguser = await users.findById(userid).select('-password'); // fetching the all user details not password
            console.log(existinguser);

            if (existinguser) {
                console.log(existinguser);
                return res.status(200).json({ user: existinguser });  // Send the user data in response
            } else {
                return res.status(404).json({ message: 'User not found' });
            }
        } else {
            return res.status(400).json({ message: 'User ID is required' });
        }

    } catch (err) {
        console.error(`The login error: ${err}`);  // Log the error for debugging
        return res.status(406).send({ message: "The user data fetching error", error: err })
    }
}

// to update the user profile details
exports.updateuserprofile = async (req, res) => {
    console.log(`inside the update user route`);
    const { userid } = req.params
    console.log({ userid })
    // logic starts
    try {
        // Step 1: Validate the User ID
        if (!userid || !mongoose.Types.ObjectId.isValid(userid)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }

        // Step 2: Filter allowed fields from the request body
        const allowedUpdates = ['displayname', 'description', 'profilePic', 'bannerPic']; // Adjust fields based on schema
        const updates = Object.keys(req.body).filter(key => allowedUpdates.includes(key));
        const updateData = updates.reduce((acc, key) => {
            acc[key] = req.body[key];
            return acc;
        }, {});

        // Step 3: Handle file uploads if `profilePic` or `bannerPic` are included
        if (req.files?.profilePic) {
            updateData.profilePic = req.files.profilePic[0].path; // Assuming a file structure for multer
        }
        if (req.files?.bannerPic) {
            updateData.bannerPic = req.files.bannerPic[0].path;
        }

        // Step 4: Update the user document in the database
        const existingUser = await users.findByIdAndUpdate(userid, updateData, { new: true });

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("User updated successfully:", existingUser);

        // Step 5: Send a success response
        return res.status(200).json({ user: existingUser });

    } catch (err) {
        console.error("Error updating user profile:", err);
        return res.status(500).json({
            message: "The user prfofile data updating error",
            error: err.message,
        });

    }
}

// to update the user account details
exports.updateuseraccount = async (req, res) => {
    console.log(`inside the update user account route`);
    const { userid } = req.params
    const { email, oldpassword, newpassword, gender } = req.body
    console.log({ userid })
    console.log(email, oldpassword, newpassword, gender);

    // logic starts
    try {
        // Step 1: Validate the User ID
        if (!userid || !mongoose.Types.ObjectId.isValid(userid)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }

        // Step 2: Get the Existing User
        const existingUser = await users.findById(userid);
        if (!existingUser) {
            return res.status(401).json({ message: "User not found" });
        }

        // let set the updating fields
        let updatedFields = {};

        // step 3: email update
        if (email) {
            const existingEmail = await users.findOne({ email });
            if (existingEmail && existingEmail._id.toString() !== userid) {
                return res.status(402).json({ message: "Email is already in use" });
            } else if (existingEmail && existingEmail._id.toString() === userid) {
                return res.status(404).json({ message: "Email cannot be the same as the old email" });
            }
            updatedFields.email = email;
        }

        // step 4: password update
        if (oldpassword && newpassword) {
            const isPasswordMatch = await argon2.verify(existingUser.password, oldpassword);
            if (!isPasswordMatch) {
                return res.status(403).json({ message: "Invalid old password" });
            }
            if (oldpassword === newpassword) {
                return res.status(404).json({ message: "New password cannot be the same as the old password" });
            }

            updatedFields.password = await argon2.hash(newpassword);
        }

        // Step 5: gender update
        if (gender) {
            if (existingUser.gender == gender) {
                return res.status(405).json({ message: "Gender cannot be the same as the old gender" });
            }
            updatedFields.gender = gender;
        }

        // Step 6: check if the updated fields are empty
        if (Object.keys(updatedFields).length === 0) {
            return res.status(406).json({ message: "No fields to update" });
        }

        // Step 7: Update the user document in the database
        const updatedUser = await users.findByIdAndUpdate(userid, updatedFields, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("User updated successfully:", updatedUser);

        // Step 8: Send a success response  
        return res.status(200).json({ user: updatedUser });
    } catch (error) {
        console.error("Error updating user profile:", err);
        return res.status(500).json({
            message: "The user account data updating error",
            error: err.message,
        });
    }
}

// get the user following list of the user
exports.getuserfollowinglist = async (req, res) => {
    console.log(`inside the get user following list route`);
    const { userid } = req.params
    console.log({ userid })
    // logic starts
    try {
        // Step 1: Validate the User ID
        if (!userid || !mongoose.Types.ObjectId.isValid(userid)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }

        // Step 2: Get the Existing User
        const existingUser = await users.findById(userid);
        if (!existingUser) {
            return res.status(401).json({ message: "User not found" });
        }

        // Step 3: Get the User's Following List
        const followingList = existingUser.following;
        if (!followingList || followingList.length === 0) {
            return res.status(304).json({ message: "User has no following list" });
        }else{
            return res.status(200).json({ followingList });
        }
        
    } catch (error) {
        console.error("Error in fetching the user following list:", err);
        return res.status(500).json({
            message: "The fetching the user following list error",
            error: err.message,
        });
    }
}


// delete the user account
exports.deleteuseraccount = async (req, res) => {
    console.log(`inside the delete user account route`);
    const { userid } = req.params
    console.log({ userid })
    // logic starts
    try {
        // Step 1: Validate the User ID
        if (!userid || !mongoose.Types.ObjectId.isValid(userid)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }

        // Step 2: Find and delete the user
        const deletedUser = await users.findByIdAndDelete(userid);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        // Step 3: Handle related data (Optional)
        // Delete user's posts (if applicable)

        console.log(`User with ID ${userid} deleted successfully.`);

        // Step 4: Respond with success message
        return res.status(200).json({
            message: "User account deleted successfully",
            user: deletedUser // Optionally return deleted user data
        });

    } catch (error) {
        console.error("Error updating user profile:", err);
        return res.status(500).json({
            message: "The user account deleting error",
            error: err.message,
        });
    }
}