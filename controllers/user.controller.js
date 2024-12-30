import User from "../models/User.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const register = asyncHandler(async (req, res) => {
  const { email, password, phone, fullName } = req.body;

  if (!password || !phone || !fullName) {
    throw new ApiError(400, "Please provide all the details");
  }

  const existedUser = await User.findOne({ phone });
  if (existedUser) {
    throw new ApiError(400, "User already exists");
  }

  const user = await User.create({ email, password, phone, fullName });

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User created successfully"));
});

export const login = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    throw new ApiError(400, "Please provide all the details");
  }

  const user = await User.findOne({ phone });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User logged in successfully"));
});

export const preferences = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { preferences } = req.body;

  if (!userId) {
    throw new ApiError(400, "Please provide all the details");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.preferences = preferences;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Preferences updated successfully"));
});
