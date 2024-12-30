const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        match: /^\S+@\S+\.\S+$/,
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isPhoneVerified: {
        type: Boolean,
        default: false
    },
    preferences: {
        type: [String],
        default: []
    },
    achievement:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Achievement'
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = {User};