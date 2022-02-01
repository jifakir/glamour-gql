const mongoose = require("mongoose");

module.exports.db = async () => {
    try{
        await mongoose.connect('mongodb+srv://jahid:Jahid5868@cluster0.jwygn.mongodb.net/graphql');
        console.log("Connection Established!");
    }catch (err){
        console.log("Connection Error: ", err.message);
    }
};