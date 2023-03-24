const Hotels = require('../models/Hotels');
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
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (err) {
        next(err)
    }

}

getallHotel = async (req, res, next) => {
   const {max,min,...others} = req.query
   const city = req.query.city;
    try {
        const Hotels = await Hotel.find({city,chepestPrice:{$gt:min || 1 , $lt:max || 999}}).limit(req.query.limit || 2);
        res.status(200).json(Hotels);
    } catch (err) {
        next(err);
    }

}

CountByCity = async (req, res, next) => {
        const cities = req.query.cities.split(",");
    try {
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).send(list);
    } catch (err) {
        next(err);
    }

}

CountByType = async (req, res, next) => {
    
try {
    const hotelCount = await Hotels.countDocuments({type:"hotels"});
    const apartementCount = await Hotels.countDocuments({type:"apartement"});
    const resortCount = await Hotels.countDocuments({type:"resort"});
    const villaCount = await Hotels.countDocuments({type:"villa"});
    const cabinCount = await Hotels.countDocuments({type:"cabin"});
     
    res.status(200).send([
        {type:"hotels",count:hotelCount},
        {type:"apartement",count:apartementCount},
        {type:"resort",count:resortCount},
        {type:"villa",count:villaCount},
        {type:"cabin",count:cabinCount}
    ])
}catch (err) {
    next(err);
}

}

// CountByCity = async (req, res, next) => {
//     const cities = req.query.cities.split(",");
// try {
//     const list = await Promise.all(cities.map(city=>{
//         return Hotel.countDocuments({city:city})
//     }))
//     res.status(200).json(list);
// } catch (err) {
//     next(err);
// }

// }

module.exports = {
    createHotel,
    updateHotel,
    deleteHotel,
    getaHotel,
    getallHotel,
    CountByCity,
    CountByType
}