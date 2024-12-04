const user = require('../Models/userSchema')
const jwt = require('jsonwebtoken')


exports.register= async (req,res) => {
    console.log('inside register function');
    const {username,email,password} = req.body
    try{
        const existingUser = await user.findOne({email})
        console.log(existingUser);
        if(existingUser){
            res.status(406).json("user already exists...please login")
        }else{
            const newUser = new user ({
                username,email,password,profile:"",github:"",linkedin:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(err){
        res.status(401).json(err)
    }
}



exports.login= async (req,res) => {
    console.log('inside login function');
    const {email,password} = req.body
    try{
        const existingUser = await user.findOne({email,password})
        console.log(existingUser);
        if(existingUser){
            const token = jwt.sign({userId:existingUser._id},process.env.jwt_secret)
            res.status(200).json({existingUser,token})
        }else{
            res.status(406).json('Invalid email/password')
        }
    }catch(err){
        res.status(401).json(err)
    }
}


//update profile

exports.updateProfile = async (req,res)=>{
    console.log("inside update profile")
    const{profileImage,github,linkedin} = req.body
    const uploadImage = req.file?req.file.filename:profileImage

    try{
        const currentProfile = await user.findById({_id:req.payload})
        const {username,email,password} = currentProfile

        const profile = await user.findByIdAndUpdate(
            {_id:req.payload},
            {username,email,password,profile:uploadImage,github,linkedin},
            {new:true}
        )

        res.status(200).json(profile)

    }catch(err){
        res.status(401).json(err)
    }
}

exports.getProfile = async (req,res) => {
    console.log("inside get profile");
    const userId = req.payload
    try{
        const profile =await user.findById({_id:userId})
        res.status(200).json(profile)

    }catch(err){
        res.status(401).json(err)
    }
}