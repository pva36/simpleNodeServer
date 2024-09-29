// const asyncHandler = require("express-async-handler");
const fs = require("node:fs");
const FILE = "./data/movies.json";

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.name = "NotFoundError";
  }
}

exports.moviesListGet = (req, res, next) => {
  fs.readFile(FILE, "utf8", (err, data) => {
    if (err) {
      next(err);
    } else {
      let objectData = JSON.parse(data);
      let movies = [];
      for (const movie in objectData) {
        movies.push(objectData[movie]);
      }
      //console.log(movies);
      res.render("index", { title: "My movies", movies: movies });
      //res.json(objectData);
    }
  });
};

exports.moviesUpdateGet = (req, res) => {
  fs.readFile(FILE, "utf8", (err, data) => {
    if (err) {
      next(err);
    } else {
      let objectData = JSON.parse(data);
      let movies = [];
      for (const movie in objectData) {
        movies.push(objectData[movie]);
      }
      // console.log(movies);
      // console.log(movies[req.params.id - 1]);
      res.render("update", {
        title: "My movies",
        movie: movies[req.params.id - 1],
      });
    }
  });
};

exports.moviesAddGet = (req, res) => {
  res.render("add", { title: "Add Movie" });
};
// exports.getMovieById = (req, res, next) => {
//   const movieId = req.params.id;
//
//   fs.readFile(FILE, "utf8", (err, data) => {
//     if (err) {
//       next(err);
//     } else {
//       let objectData = JSON.parse(data);
//       if (!(movieId in objectData)) {
//         next(new NotFoundError(`movie with index ${movieId} not found.`));
//       } else {
//         res.json(objectData[movieId]);
//       }
//     }
//   });
// };

/* OLD */
// exports.getMovies = (req, res, next) => {
//   fs.readFile(FILE, "utf8", (err, data) => {
//     if (err) {
//       next(err);
//     } else {
//       let objectData = JSON.parse(data);
//       res.json(objectData);
//     }
//   });
// };

// exports.createMovie = (req, res, next) => {
//   // TODO
//   // create movies
//   console.log("creating a new movie");
//   res.send("creating a new movie");
// };

// TODO:
// const getMoviesProperty = (req, res, next) => {}

// const updateMovie = (req, res, next) => {}

// const deleteMovie = (req, res, next) => {}
