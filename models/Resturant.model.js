import mongoose from "mongoose";

const ResturantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  ratinngCount: {
    type: Number,
    required: true,
    default: 0,
  },
  cusine: {
    type: [String],
  },
  image: {
    type: String,
    required: true,
  },
 items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
 }]
 
});
