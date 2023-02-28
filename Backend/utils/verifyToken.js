const jwt = require('jsonwebtoken');
const {createError} = require('./error.js');

const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;
   // console.log(token);
    if(!token){
        return next(createError(401,"You are not authenticated!"));
    }

    jwt.verify(token , process.env.JWT,(err,user)=>{
          if(err){
            return next(createError(403," Token is not Vaild! "));
          }
         // console.log(user);
          req.validuser = user ; 
          next();
    });

}

const verifyUser = (req,res,next)=>{
    verifyToken (req,res,next,()=>{
       // console.log(req.validuser.id);
        if(req.validuser.id == req.params.id || req.validuser.isAdmin){
            next();
        }else{
            return next(createError(403,"You are not authorized!"));
        }
    })

}

const verifyAdmin = (req,res,next)=>{
    verifyToken (req,res,next,()=>{
       // console.log(req.validuser.id);
        if(req.validuser.isAdmin){
            next();
        }else{
            return next(createError(403,"You are not authorized!"));
        }
    })

}

module.exports ={ verifyToken,verifyUser,verifyAdmin};