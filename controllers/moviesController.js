const asyncHandler = require("express-async-handler");
const fs = require("node:fs");

const getMovieById = asyncHandler(async (req, res) => {
  const movieId = req.params.id;
  res.send(`returning movie with id ${movieId}`);
  // const movie = (movieId) => {
  //   //get movie from json
  //   return movie;
  // };

  // if (!movie) {
  //   throw new Error("User not found");
  // }

  // res.json(movie);
});

const getMovies = asyncHandler(async (req, res) => {
  // get movies
  res.send("returning all movies");
});

const createMovie = asyncHandler(async (req, res) => {
  // create movies
  console.log("creating a new movie");
  res.send("creating a new movie");
});

module.exports = { getMovieById, getMovies, createMovie };
