const express = require('express');
const {deleteUser,getUser,getUsers,updateUser} = require('../controllers/user.js');
const { verifyToken, verifyUser } = require('../utils/verifyToken.js');

const router = express.Router();

router.get('/checkauthentication', verifyToken ,(req,res,next)=>{
        res.json("hello user !!");
})

router.get('/checkuser/:id', verifyUser ,(req,res,next)=>{
        res.json("hello user !!");
})

//UPDATE
router.put('/update/:id',updateUser);

//DELETE
router.delete('/delete/:id',deleteUser);

//GET
router.get('/getuser/:id',getUser);

//GET ALL Authentication is in 42:00 so go and look at it!!!
router.get('/',getUsers);

module.exports = router;