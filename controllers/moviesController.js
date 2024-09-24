// const asyncHandler = require("express-async-handler");
const fs = require("node:fs");

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.name = "NotFoundError";
  }
}

const FILE = "./data/movies.json";

const getMovieById = (req, res, next) => {
  const movieId = req.params.id;

  fs.readFile(FILE, "utf8", (err, data) => {
    if (err) {
      next(err);
    } else {
      let objectData = JSON.parse(data);
      if (!(movieId in objectData)) {
        next(new NotFoundError(`movie with index ${movieId} not found.`));
      } else {
        res.json(objectData[movieId]);
      }
    }
  });
};

const getMovies = (req, res, next) => {
  fs.readFile(FILE, "utf8", (err, data) => {
    if (err) {
      next(err);
    } else {
      let objectData = JSON.parse(data);
      res.json(objectData);
    }
  });
};

const createMovie = (req, res, next) => {
  // TODO
  // create movies
  console.log("creating a new movie");
  res.send("creating a new movie");
};

// TODO:
// const getMoviesProperty = (req, res, next) => {}

// const updateMovie = (req, res, next) => {}

// const deleteMovie = (req, res, next) => {}

module.exports = { getMovieById, getMovies, createMovie };
