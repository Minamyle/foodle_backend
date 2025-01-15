const Restaurant = require("../models/Resturant.js");

// Create Restaurant
const createRestaurant = async (req, res) => {
  try {
    const { name, location, cuisine, rating } = req.body;

    // Validation
    if (!name || !location || !cuisine || rating === undefined) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (rating < 0 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 0 and 5" });
    }

    const restaurant = new Restaurant({ name, location, cuisine, rating });
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get All Restaurants
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ deletedAt: null });
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Single Restaurant
const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findOne({ _id: id, deletedAt: null });

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update Restaurant
const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, cuisine, rating } = req.body;

    // Validate rating if provided
    if (rating !== undefined && (rating < 0 || rating > 5)) {
      return res.status(400).json({ error: "Rating must be between 0 and 5" });
    }

    const restaurant = await Restaurant.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { name, location, cuisine, rating },
      { new: true }
    );

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete Restaurant (Soft Delete)
const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { deletedAt: new Date() },
      { new: true }
    );

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found or already deleted" });
    }

    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
};
