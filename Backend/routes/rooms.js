const express = require('express');
const { verifyAdmin } = require('../utils/verifyToken');
const { createRoom, 
        updateRoom, 
        deleteRoom, 
        getaRoom, 
        getallRoom 
    } = require('../controllers/rooms.js');


const router = express.Router();

//CREATE
router.post('/create/:hotelid',verifyAdmin,createRoom);

//UPDATE
router.put('/:id',verifyAdmin,updateRoom);

//DELETE
router.delete('/:id',verifyAdmin,deleteRoom);

//GET
router.get('/:id',getaRoom);

//GET ALL Authentication is in 42:00 so go and look at it!!!
router.get('/',getallRoom);
module.exports = router;