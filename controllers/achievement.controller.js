import Achievement from "../models/Achievement.model.js";
import User from "../models/User.model.js";
import UserAchievement from "../models/UserAchievement.model.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const dummyAchievements = [
  {
    title: "Momo Marathon",
    description:
      "Try 5 different momo varieties from different restaurants.",
    coinReward: 100,
    icon: "https://www.pinterest.com/c0b33db6-e71a-48c3-8adb-ff6a04978302",
    criteria: {
      metric: "restaurants_visited",
      value: 5,
      timeframe: "all-time",
    },
    type: "food",
    category: "explorer",
  },
  {
    title: "Dal-Bhat Power",
    description:
      "Order  a classic dal-bhat-tarkari meal for 7 consecutive days.",
    coinReward: 150,
    icon: "https://i.pinimg.com/736x/47/47/a8/4747a835710db56e2d60d778dc185c32.jpg",
    criteria: {
      metric: "consecutive_days",
      value: 7,
      timeframe: "daily",
    },
    type: "food",
    category: "collector",
  },
  {
    title: "Newar Feast Challenge",
    description:
      "Explore Newari cuisine by trying dishes like yomari, bara, or chatamari from specific restaurants.",
    coinReward: 200,
    icon: "https://i.pinimg.com/736x/93/a5/08/93a50898d36565669254619cb7c75858.jpg",
    criteria: {
      metric: "newari_dishes_tried",
      value: 3,
      timeframe: "all-time",
    },
    type: "food",
    category: "explorer",
  },
  {
    title: "Street Food Explorer",
    description:
      "Try street foods like pani puri, chatpate, or laphing from three popular street vendors.",
    coinReward: 120,
    icon: "https://i.pinimg.com/736x/bc/f1/c9/bcf1c91265583eba1e66562e2fa5f8f6.jpg",
    criteria: {
      metric: "street_foods_tried",
      value: 3,
      timeframe: "all-time",
    },
    type: "food",
    category: "explorer",
  },
];

export const createAchievement = asyncHandler(async (req, res) => {
  try {
    const achievements = await Promise.all(
      dummyAchievements.map(async (achievement) => {
        const createdAchievement = await Achievement.create(achievement);
        return createdAchievement;
      })
    );

    return res
      .status(200)
      .json(
        new ApiResponse(200, achievements, "Achievements created successfully")
      );
  } catch (error) {
    throw new ApiError(500, "Failed to create achievements");
  }
});

export const getUserAchievements = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const allAchievements = await Achievement.find();

  let userAchievement = await UserAchievement.findOne({
    user: userId,
  }).populate("achievements.achievement");

  if (!userAchievement) {
    userAchievement = await UserAchievement.create({
      user: userId,
      achievements: allAchievements.map((achievement) => ({
        achievement: achievement._id,
        progress: 0,
        currentValue: 0,
        isCompleted: false,
      })),
    });
  } else {
    const existingAchievementIds = userAchievement.achievements.map((ap) =>
      ap.achievement._id.toString()
    );
    const missingAchievements = allAchievements.filter(
      (achievement) =>
        !existingAchievementIds.includes(achievement._id.toString())
    );

    if (missingAchievements.length > 0) {
      userAchievement.achievements.push(
        ...missingAchievements.map((achievement) => ({
          achievement: achievement._id,
          progress: 0,
          currentValue: 0,
          isCompleted: false,
        }))
      );

      await userAchievement.save();
    }
  }

  const formattedAchievements = userAchievement.achievements.map(
    (achievementProgress) => {
      const achievement = achievementProgress.achievement;
      return {
        taskName: achievement.title,
        taskDescription: achievement.description,
        progress: achievementProgress.progress,
        xpReward: achievement.xpReward,
        icon: achievement.icon,
      };
    }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        formattedAchievements,
        "User achievements fetched successfully"
      )
    );
});
