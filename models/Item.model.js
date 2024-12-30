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
    ratinngCount: {
        type: Number,
        required: true,
        default: 0,
    },
    resturant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resturant",
    }

});

const Item = mongoose.model("Item", ItemSchema);