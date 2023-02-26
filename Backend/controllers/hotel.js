const Hotel = require('../models/Hotels');


createHotel = async (req, res, next) => {
    console.log("entering the controllers/hotel.js");
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (err) {
        next(err)
    }

}

updateHotel = async (req, res, next) => {
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updateHotel);
    } catch (err) {
        next(err)
    }
}


deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotels has been deleted");
    } catch (err) {
        next(err);
    }

}


getaHotel = async (req, res, next) => {
    try {
        const Hotel = await Hotel.findById(req.params.id);
        res.status(200).json(Hotel);
    } catch (err) {
        next(err)
    }

}

getallHotel = async (req, res, next) => {

    try {
        const Hotels = await Hotel.find();
        res.status(200).json(Hotels);
    } catch (err) {
        next(err);
    }

}

module.exports = {
    createHotel,
    updateHotel,
    deleteHotel,
    getaHotel,
    getallHotel
}