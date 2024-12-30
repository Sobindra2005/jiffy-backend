import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AchievementSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    coinReward: {
      type: Number,
      required: [true, "Coin reward is required"],
      min: 0,
    },
    icon: {
      type: String,
      required: [true, "Icon is required"],
    },

    criteria: {
      type: {
        metric: {
          type: String,
          required: true,
        },
        value: {
          type: Number,
          required: true,
        },
        timeframe: {
          type: String,
          enum: ["daily", "weekly", "monthly", "all-time"],
          default: "all-time",
        },
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Achievement = mongoose.model("Achievement", AchievementSchema);

export default Achievement;