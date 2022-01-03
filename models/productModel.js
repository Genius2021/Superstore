const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: false,
    },
    brand: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    countInStock: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    numReviews: {
        type: Number, 
        required: false
    },
    rating: {
        type: Number,
        required: false,
    }

}, {timestamps: true });


const Product = mongoose.model("product", productSchema);

module.exports = Product;