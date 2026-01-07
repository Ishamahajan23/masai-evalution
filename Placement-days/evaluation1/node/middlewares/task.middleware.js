const Apikey = require("../model/apiKey.model")
async function verifyApiKey(req,res, next){
     
   const {apiKey} = req.query;
    if(!apiKey){
        return res.status(401).json({
            message: "API key is required",
            success: false
        })
    }

    const keyExists = await Apikey.findOne({apiKey});
    if(!keyExists){
        return res.status(401).json({
            message: "Invalid API key",
            success: false
        })
    }
     next();
}
module.exports = verifyApiKey;