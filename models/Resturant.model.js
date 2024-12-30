import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({ 
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
  ratingCount: { 
    type: Number,
    required: true,
    default: 0,
  },
  cuisine: { 
    type: [String],
    required: true,
    default: []
  },
  image: {
    type: String,
    required: true,
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
  }]
}, {
  timestamps: true
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
export default Restaurant;