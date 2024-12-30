import Item from "../models/Item.model.js";
import User from "../models/User.model.js";
import Resturant from "../models/Resturant.model.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Restaurant from "../models/Resturant.model.js";
import mongoose from "mongoose";

export const getAllRestaurant = asyncHandler(async(req, res)=>{
    const resturants = await Resturant.find();

    return res
        .status(200)
        .json(new ApiResponse(200, resturants, "Resturants fetched successfully"));
})

export const getRestaurant = asyncHandler(async(req, res)=>{
    const {resturantId} = req.params;

    if(!resturantId){
        throw new ApiError(400, "Please provide all the details");
    }

    const resturant = await Resturant.findById(resturantId);

    return res
        .status(200)
        .json(new ApiResponse(200, resturant, "Resturant fetched successfully"));
})

export const getRestaurantCategories = asyncHandler(async (req, res) => {
    const { restaurantId } = req.params;

    if (!restaurantId) {
        throw new ApiError(400, "Restaurant ID is required");
    }

    // Validate if restaurantId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
        throw new ApiError(400, "Invalid restaurant ID format");
    }

    // First check if restaurant exists
    const restaurantExists = await Restaurant.exists({ _id: restaurantId });
    if (!restaurantExists) {
        throw new ApiError(404, "Restaurant not found");
    }

    try {
        const categories = await Item.find({ 
            restaurant: restaurantId 
        }).distinct('category');

        return res
            .status(200)
            .json(new ApiResponse(
                200, 
                { categories }, 
                categories.length ? "Categories fetched successfully" : "No categories found"
            ));
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw new ApiError(500, "Error occurred while fetching categories");
    }
});

export const getRestaurantItems = asyncHandler(async (req, res) => {
    const { restaurantId } = req.params;
    const { category } = req.query; // Optional category filter

    if (!restaurantId) {
        throw new ApiError(400, "Restaurant ID is required");
    }

    // Validate if restaurantId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
        throw new ApiError(400, "Invalid restaurant ID format");
    }

    // First check if restaurant exists
    const restaurantExists = await Restaurant.exists({ _id: restaurantId });
    if (!restaurantExists) {
        throw new ApiError(404, "Restaurant not found");
    }

    try {
        // Build query
        const query = { restaurant: restaurantId };
        if (category) {
            query.category = category;
        }

        const items = await Item.find(query)
            .select("-__v") // Exclude version key
            .sort({ category: 1, name: 1 }); // Sort by category and then name

        return res
            .status(200)
            .json(new ApiResponse(
                200, 
                { items }, 
                items.length ? "Items fetched successfully" : "No items found"
            ));
    } catch (error) {
        console.error("Error fetching items:", error);
        throw new ApiError(500, "Error occurred while fetching items");
    }
});