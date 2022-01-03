const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 250,
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 250,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        maxlength: 250,
        unique: true
    },
    address: {
        type: String,
        required: false,
        maxlength: 300,
    },
    mobileNumber: {
        type: String,
        required: true,
        maxlength: 100,
        unique: true,
    },
    picture: {
        type: String,
        required: false,
        maxlength: 500,
    },
    password: {
        type: String,
        required: true,
        maxlength: 250,
    },
    isAdmin: {
        type: Boolean, 
        default: false, 
        required:true
    },


}, {timestamps: true });


const User = mongoose.model("user", userSchema);

module.exports = User;