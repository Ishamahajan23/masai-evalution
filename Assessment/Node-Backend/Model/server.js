const mongoose = require("mongoose");

const connectDB =()=>{
    try{
        mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to DB")
    }catch(err){
        console.log("Error connecting to DB", err)
    }
}

module.exports=connectDB;