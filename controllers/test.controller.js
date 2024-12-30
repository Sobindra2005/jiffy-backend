import Resturant from "../models/Resturant.model.js";
import Item from "../models/Item.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

export const createResturaunt = asyncHandler(async (req, res) => {
  const resturant = await Resturant.create({
    name: "The Gardens",
    description:
      "A charming restaurant offering a delightful brunch experience, along with a variety of drinks, snacks, and pizzas. Known for its serene ambiance and free parking facilities.",
    address: "Panipokhari, Lazimpat, Kathmandu",
    rating: 0, // Assuming no ratings yet; update as necessary
    ratingCount: 0, // Assuming no ratings yet; update as necessary
    cuisine: ["Brunch", "Drinks", "Snacks", "Pizza"],
    image: "https://www.instagram.com/thegardens.np/", // Placeholder; replace with an actual image URL if available
    items: [], // Populate with ObjectId references to Item documents as needed
  });

  return res
    .status(201)
    .json(new ApiResponse(201, resturant, "Resturant created successfully"));
});

export const createItem = asyncHandler(async (req, res) => {
  const restaurantId = "677227483eae41034f3f6eb1";

  const item = await Item.create(  {
    name: "The Gardens Special Hot Chocolate",
    description: "Rich and creamy hot chocolate, perfect for warming up on chilly days.",
    price: 250,
    image: "https://example.com/images/special_hot_chocolate.jpg", // Replace with actual image URL
    rating: 4.7,
    ratingCount: 85,
    restaurant: restaurantId,
    category: "Beverage",
    prepareTime: 10,
    tags: ["Hot Drink", "Chocolate", "Vegetarian"],
  });

  return res
    .status(201)
    .json(new ApiResponse(201, item, "Item created successfully"));
});
