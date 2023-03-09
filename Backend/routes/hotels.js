const express = require('express');
const {createHotel, CountByType} = require("../controllers/hotel");
const {updateHotel} = require("../controllers/hotel");
const {deleteHotel} = require("../controllers/hotel");
const {getaHotel} = require("../controllers/hotel");
const {getallHotel} = require("../controllers/hotel");
const {CountByCity} = require("../controllers/hotel");



const { verifyAdmin } = require('../utils/verifyToken')

const router = express.Router();

//CREATE
router.post('/create',verifyAdmin,createHotel);

//UPDATE
router.put('/updateahotel/:id',verifyAdmin,updateHotel);

//DELETE
router.delete('/deleteahotel/:id',verifyAdmin,deleteHotel);

//GET
router.get('/findahotel/:id',getaHotel);

//GET ALL Authentication is in 42:00 so go and look at it!!!
router.get('/getallhotel',getallHotel);

//////////

router.get('/CountByCity',CountByCity);

//////////

router.get('/CountByType',CountByType);



module.exports = router;