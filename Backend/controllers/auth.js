const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const {createError} = require('../utils/error.js');


const register = async (req,res,next)=>{
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email:req.body.email,
            password:hash
        });
        await newUser.save();
res.status(200).json("user has been added!!!");
    }catch(err){
       next(err);
    }

}

const login = async (req,res,next)=>{
    try{
        const user = await User.find({email:req.body.email});
        if(!user) return next(createError(404),"user not found");
        const  isPasswordCorrect = await bcrypt.compare(req.body.password,user[0].password);
        if(!isPasswordCorrect) return next(createError(400),"Wrong password and emailId");
        const token = jwt.sign({id:user[0]._id,isAdmin:user[0].isAdmin},process.env.JWT);
        const {password,isAdmin,...otherDetails} = user;
        res.cookie("access_token",token,{
            httpOnly:true,
        }).status(200).json({...otherDetails});
    }catch(err){
       next(err);
    }

}

module.exports ={ register,login};