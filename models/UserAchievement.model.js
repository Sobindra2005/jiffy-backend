import mongoose, { Schema } from "mongoose";

const userAchievementSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  achievements: [
    {
      achievement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Achievement",
      },
      progress: {
        type: Number,
        required: true,
      },
      isCompleted: {
        type: Boolean,
        default: false,
      },
      currentValue: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  ],
});


const UserAchievement = mongoose.model(
  "UserAchievement",
  userAchievementSchema
);

export default UserAchievement;
