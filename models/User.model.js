import mongoose from 'mongoose';

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
    categories: {
        type: [String], 
        required: true,
        default: [] 
    },
    cuisines: {
        type: [String], 
        required: true,
        default: [] 
    },
    achievement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Achievement'
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;