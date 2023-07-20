const express = require('express');
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const authRoute = require('./routes/auth.js');
const hotelRoute = require('./routes/hotels.js');
const userRoute = require('./routes/users.js');
const roomsRoute = require('./routes/rooms.js');
const cors = require('cors');
const cookieParser = require('cookie-parser'); 
const app = express();

app.use(cors());

dotenv.config();
app.use(cookieParser());
const connect = async ()=>{
try{
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongodb!!!");
}catch(error){
  throw error
}
};

mongoose.connection.on("disconnected",()=>{
  console.log("disconnected");
});
mongoose.connection.on("connected",()=>{
  console.log("connected");
});

//middleware
app.use(express.json());

app.use("/auth",authRoute);
app.use("/users",userRoute);
app.use("/hotels",hotelRoute);
app.use("/rooms",roomsRoute);

app.use((err,req,res,next)=>{
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Somethin went wrong!!!";
  return res.status(errorStatus).json({
    success:false,
    status:errorStatus,
    message:errorMessage,
    stack:err.stack,
  });
});

const port = process.env.PORT || 3001

app.listen(port,"0.0.0.0",()=>{
    connect();
    console.log("running !!!");
})