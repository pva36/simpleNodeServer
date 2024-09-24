const express = require("express");
const moviesController = require("../controllers/moviesController.js");

const router = express.Router();

// maybe a top level middleware function that handles authentication
// route.use(authMiddleware)

// router-level middlewares
router.get("/", moviesController.getMovies);

router.post("/", moviesController.createMovie);

router.get("/:id", moviesController.getMovieById);

// TODO:
// - delete
// - update

module.exports = router;
