const express = require("express");
const moviesController = require("../controllers/moviesController.js");

const moviesRouter = express.Router();

/********************** get all movies (HOME) *******************************/
moviesRouter.get("/", moviesController.moviesListGet);

/************************* add movies ***************************************/

moviesRouter.get("/add", moviesController.moviesAddGet);
// TODO:
moviesRouter.post("/add", moviesController.moviesAddPost);

/************************ update movies *************************************/

// TODO: maybe change path to /update/:id
moviesRouter.get("/:id/update", moviesController.moviesUpdateGet);
// TODO: change to Put, maybe change path to /update/:id
moviesRouter.put("/:id/update", moviesController.moviesUpdatePut);

/***************************** delete movies ********************************/
// TODO: maybe change path to
moviesRouter.delete("/delete/:id", moviesController.moviesDelete);

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
