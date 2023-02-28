const mongoose = require('mongoose');
const { Schema } = mongoose;


const RoomSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    
    MaxPpl:{
        type:Number,
        default:false
    },
    roomNumbers:[{number:Number,unavailableDates: {type:[Date]}}],
},{timestamps:true});

module.exports = mongoose.model("Room",RoomSchema);