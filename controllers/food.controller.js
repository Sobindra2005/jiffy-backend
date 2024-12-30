import Item from "../models/Item.model.js";
import User from "../models/User.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getRecommendedItems = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new ApiError(400, "Please provide all the details");
  }

  // Fetch user by ID
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Fetch items based on user preferences (if any)
  let recommendedItems = [];
  if (user.preferences && user.preferences.length > 0) {
    recommendedItems = await Item.find({
      tags: { $in: user.preferences },
    }).limit(5);
  }

  // If recommendations are insufficient, fetch additional items
  if (recommendedItems.length < 5) {
    const additionalItems = await Item.find()
      .limit(5 - recommendedItems.length)
      .lean(); // Use `.lean()` for better performance if no Mongoose methods are needed

    recommendedItems = [...recommendedItems, ...additionalItems];
  }

  return res
    .status(200)
    .json(new ApiResponse(200, recommendedItems, "Recommended Items"));
});

export const getRapidFeast = asyncHandler(async (req, res) => {
  const items = await Item.find().sort({ prepareItem: 1 }).limit(5).populate({
    path: "restaurant",
    select: "name address",
  });

  return res.status(200).json(new ApiResponse(200, items, "Rapid Feast Items"));
});

export const getFoodItem = asyncHandler(async (req, res) => {
  const { itemId } = req.params;

  if (!itemId) {
    throw new ApiError(400, "Please provide all the details");
  }

  const item = await Item.findById(itemId);

  if (!item) {
    throw new ApiError(404, "Item not found");
  }

  return res.status(200).json(new ApiResponse(200, item, "Food Item"));
});
