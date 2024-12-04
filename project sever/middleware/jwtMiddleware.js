const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log("inside jwt middleware")
    try{
        const token = req.headers["authorization"].split(" ")[1]
        if(token){
            const jwtResponse = jwt.verify(token,process.env.jwt_secret)
            req.payload = jwtResponse.userId
            next()
        }else{
            res.status(401).json("Please provide token")
        }
    }catch{
        res.status(403).json("Please login")
    }
}

module.exports = jwtMiddleware