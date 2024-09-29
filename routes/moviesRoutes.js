const express = require("express");
const moviesController = require("../controllers/moviesController.js");

const moviesRouter = express.Router();

/* get all movies (main page) */
moviesRouter.get("/", moviesController.moviesListGet);

/* add movies */
// TODO:
moviesRouter.get("/add", moviesController.moviesAddGet);
// TODO:
// moviesRouter.post("/add", moviesController.moviesAddPost);

/* update movies */
// TODO:
moviesRouter.get("/:id/update", moviesController.moviesUpdateGet);
// TODO:
// moviesRouter.post("/:id/update", moviesController.moviesUpdatePost);

/* delete movies */
// TODO:
// moviesRouter.post(":id/delete", moviesController.moviesDeletePost);

/* OLD STUFF */

// GET
// router.get("/", moviesController.getMovies);
// TODO moviesController.getMovieByQuery --> it should handle id and name

// moviesRouter.get("/:id", moviesController.getMovieById);

// TODO:
// router.get("/:id/:property", moviesController.getMoviesProperty);

// POST
// moviesRouter.post("/", moviesController.createMovie);

// PUT
// router.put("/:id", moviesController.updateMovie);

// DELETE
// router.delete("/:id", moviesController.deleteMovie);

module.exports = moviesRouter;
