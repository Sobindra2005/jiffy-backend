const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isPhoneVerified:{
        type: Boolean,
        default: false
    },
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = {User};