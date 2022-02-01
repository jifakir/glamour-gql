const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    imgUrl: {type: String, required: true},
    price: {type: Number, required: true},
    discount: {type: Number, required: true},
    sku: {type: String, required: true, unique: true},
    created_at: {type: Date},
    updated_at: {type: Date}
});

module.exports = mongoose.model('Product', productSchema);