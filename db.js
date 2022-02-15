const mongoose = require("mongoose");

module.exports.db = async () => {

    try{

        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connection Established!");

    }catch (err){

        console.log("Connection Error: ", err.message);
        
    }

};