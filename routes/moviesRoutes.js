const express = require("express");
const moviesController = require("../controllers/moviesController.js");

const moviesRouter = express.Router();

/********************** get all movies (HOME) *******************************/

moviesRouter.get("/", moviesController.moviesListGet);

/************************* add movies ***************************************/

moviesRouter.get("/add", moviesController.moviesAddGet);

moviesRouter.post("/add", moviesController.moviesAddPost);

/************************ update movies *************************************/

// TODO: maybe change path to /update/:id
moviesRouter.get("/:id/update", moviesController.moviesUpdateGet);
// TODO: maybe change path to /update/:id
moviesRouter.put("/:id/update", moviesController.moviesUpdatePut);

/***************************** delete movies ********************************/

// TODO: maybe change path to
moviesRouter.delete("/delete/:id", moviesController.moviesDelete);

module.exports = moviesRouter;
