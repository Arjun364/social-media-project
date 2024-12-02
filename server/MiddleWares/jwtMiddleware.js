const jwt = require("jsonwebtoken") // imported the json webtoken 

const jwtMiddleware=(req,res,next)=>{
    console.log("inside jwtMiddleware");
    try{
        // console.log("inside the jwt try block");
        const token = req.headers['authorization'].slice(7)
        console.log(token);
        if(token){
            jwtVerification =jwt.verify(token,process.env.JWT_Key)
            req.payload = jwtVerification
            console.log(jwtVerification);
            next()
        }
        else{
            res.status(401).json("Please provide token")
        }
    }
    catch(err){
        res.status(403).json("jwt error")
    }
    // next()
}

module.exports=jwtMiddleware