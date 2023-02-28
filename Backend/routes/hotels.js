const express = require('express');
const {createHotel} = require("../controllers/hotel");
const {updateHotel} = require("../controllers/hotel");
const {deleteHotel} = require("../controllers/hotel");
const {getaHotel} = require("../controllers/hotel");
const {getallHotel} = require("../controllers/hotel");
const { verifyAdmin } = require('../utils/verifyToken');

const router = express.Router();

//CREATE
router.post('/create',verifyAdmin,createHotel);

//UPDATE
router.put('/:id',verifyAdmin,updateHotel);

//DELETE
router.delete('/:id',verifyAdmin,deleteHotel);

//GET
router.get('/:id',getaHotel);

//GET ALL Authentication is in 42:00 so go and look at it!!!
router.get('/',getallHotel);


module.exports = router;