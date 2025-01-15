const express = require("express");
const {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} = require("../controllers/resturantController.js");
const { param, body, validationResult } = require("express-validator");

const router = express.Router();

// Validation Middleware
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array().map((err) => err.msg) });
  }
  next();
};

// Routes
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("location").notEmpty().withMessage("Location is required"),
    body("cuisine").notEmpty().withMessage("Cuisine is required"),
    body("rating")
      .isFloat({ min: 0, max: 5 })
      .withMessage("Rating must be between 0 and 5"),
    validateRequest,
  ],
  createRestaurant
);

router.get("/", getAllRestaurants);

router.get(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid ID format"), validateRequest],
  getRestaurantById
);

router.put(
  "/:id",
  [
    param("id").isMongoId().withMessage("Invalid ID format"),
    body("rating")
      .optional()
      .isFloat({ min: 0, max: 5 })
      .withMessage("Rating must be between 0 and 5"),
    validateRequest,
  ],
  updateRestaurant
);

router.delete(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid ID format"), validateRequest],
  deleteRestaurant
);

module.exports = router;
