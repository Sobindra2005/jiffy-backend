import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  ratingCount: {
    type: Number,
    required: true,
    default: 0,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant", 
    ref: "Restaurant", 
    required: true
  },
  category: {
    type: String,
    required: true
  },
  prepareTime: {
    type: Number,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  }
});

const Item = mongoose.model("Item", ItemSchema);
export default Item;