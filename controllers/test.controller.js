import Resturant from "../models/Resturant.model.js";
import Item from "../models/Item.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { resturants, items } from "../data.js";

export const createResturaunt = asyncHandler(async (req, res) => {
  const resturantsResult = await Promise.all(
    resturants.map(async (a) => {
      const res = await Resturant.create(a);
      return res;
    })
  );

  return res
    .status(201)
    .json(
      new ApiResponse(201, resturantsResult, "Resturant created successfully")
    );
});

export const createItem = asyncHandler(async (req, res) => {
  const id = "6772ad84d6132da862949708";

  const itemResult = await Promise.all(
    items.map(async (a) => {
      const res = await Item.create({ ...a, restaurant: id });
      return res;
    })
  );

  return res
    .status(201)
    .json(new ApiResponse(201, itemResult, "Resturant created successfully"));
});
