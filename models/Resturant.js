
const { Schema, model } = require("mongoose");

const RestaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Restaurant name is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    cuisine: {
      type: String,
      required: [true, "Cuisine is required"],
    },
    rating: {
      type: Number,
      min: [0, "Rating must be at least 0"],
      max: [5, "Rating cannot exceed 5"],
      required: [true, "Rating is required"],
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = model("Restaurant", RestaurantSchema);
