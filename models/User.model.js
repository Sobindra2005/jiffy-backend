import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    preferences: {
      type: [String],
      default: [],
    },
    achievement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Achievement",
    },
    coins: {
      type: Number,
      default: 50,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
