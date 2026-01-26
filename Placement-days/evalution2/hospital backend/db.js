const mongoose = require('mongoose');
require('dotenv').config();
console.log('Mongo URI:', process.env.MONGODB_URI);


const connectDB = async () => {
  try {
     await mongoose.connect(process.env.MONGODB_URI|| "mongodb://127.0.0.1:27017/hospital");
    console.log('MongoDB connected');


    }
    catch (error) {
    console.error('MongoDB connection error:', error);
  }
};


module.exports = {connectDB};
