// logic for user APIs
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

        // encrpting the password for security
        const hashedPassword = await argon2.hash(password)

        // if there is no user in name of username and email address then
        const newUser = new users({
            username: username,
            email: email,
            password: hashedPassword,
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
        console.log(existinguser);
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
