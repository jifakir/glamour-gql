const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    token: String,
    created_at: Date,
    updated_at: Date
});

module.exports = mongoose.model('User', userSchema);
