const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyToken");

// Get all movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get movies by category
router.get("/category/:category", async (req, res) => {
  try {
    const movies = await Movie.find({ category: req.params.category });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all movies grouped by category
router.get("/categories", async (req, res) => {
  try {
    const moviesByCategory = await Movie.aggregate([
      {
        $group: {
          _id: "$category", // Group by category
          content: { $push: "$$ROOT" }, // Add all movies to 'content' array
        },
      },
      {
        $project: { _id: 0, category: "$_id", content: 1 }, // Format output
      },
    ]);

    res.json(moviesByCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get top 5 recently added movies
router.get("/recent", async (req, res) => {
  try {
    const recentMovies = await Movie.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .limit(5); // Get only the top 5

    res.json([{ category: "Recently Added", content: recentMovies }]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;