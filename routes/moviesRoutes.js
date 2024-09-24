const express = require("express");
const moviesController = require("../controllers/moviesController.js");

const router = express.Router();

// maybe a top level middleware function that handles authentication
// route.use(authMiddleware)

// router-level middlewares

// GET
router.get("/", moviesController.getMovies);

router.get("/:id", moviesController.getMovieById);

// TODO:
// router.get("/:id/:property", moviesController.getMoviesProperty);

// POST
router.post("/", moviesController.createMovie);

// PUT
// router.put("/:id", moviesController.updateMovie);

// DELETE
// router.delete("/:id", moviesController.deleteMovie);

module.exports = router;
