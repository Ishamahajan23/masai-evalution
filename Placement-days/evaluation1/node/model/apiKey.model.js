const mongoose = require("mongoose");
const apiKeySchema = new mongoose.Schema({
    email:{type:String, required:true, unique: true},
    apiKey : String,
})
module.exports = mongoose.model("apiKey", apiKeySchema);