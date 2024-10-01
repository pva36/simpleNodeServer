// const asyncHandler = require("express-async-handler");
const fs = require("node:fs");
const movies = require("../data/movies.js");
// const FILE = "./data/movies.json";

/**************************** HELPER FUNCTIONS ******************************/
const getMoviesArray = (moviesObject) => {
  let moviesArray = [];
  for (const id in moviesObject) {
    moviesArray.push(moviesObject[id]);
  }
  return moviesArray;
};

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.name = "NotFoundError";
  }
}

/********************************* HOME *************************************/
exports.moviesListGet = (req, res) => {
  const moviesArray = getMoviesArray(movies.getAllMovies());
  res.render("index", { title: "My favourite movies!", movies: moviesArray });
};

/******************************** ADD ***************************************/
exports.moviesAddGet = (req, res) => {
  res.render("add", { title: "Add Movie" });
};

exports.moviesAddPost = (req, res) => {
  movies.addMovie(
    req.body.name,
    req.body.genre,
    req.body.year,
    req.body.director,
  );
  movies.writeJsonFile();
  res.redirect("/");
};

/******************************* UPDATE *************************************/
exports.moviesUpdateGet = (req, res) => {
  const moviesArray = getMoviesArray(movies.getAllMovies());
  res.render("update", {
    title: "Update Movie",
    movie: moviesArray[req.params.id - 1],
  });
};

exports.moviesUpdatePut = (req, res, next) => {
  // const movieToUpdate = movies.getMovieById(req.params.id);
  movies.updateMovie(req.params.id, {
    name: req.body.name,
    genre: req.body.genre,
    year: req.body.year,
    director: req.body.director,
  });
  movies.writeJsonFile();
  res.redirect("/");
};

/******************************** DELETE ************************************/
exports.moviesDelete = (req, res, next) => {
  movies.deleteMovie(req.params.id);
  movies.writeJsonFile();
  res.redirect("/");
};
