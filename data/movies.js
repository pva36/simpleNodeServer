const fs = require("node:fs");
const path = require("node:path");

class Movies {
  constructor() {
    this.object = JSON.parse(
      fs.readFileSync(path.join(__dirname, "./movies.json"), "utf-8"),
    );
    this.id = 1; // type string
    this.getNextId();
  }
  getNextId() {
    // helper function
    const getMaxId = (object) => {
      let keys = Object.keys(object);
      let maxValue = 0;
      for (const id of keys) {
        if (parseInt(id) > maxValue) {
          maxValue = parseInt(id);
        }
      }
      return String(maxValue);
    };

    // set the next id for available for use, else add a new id.
    let currentMaxId = getMaxId(this.object);

    // whether there is an id less than the current max id that is not used:
    for (let i = 1; i < parseInt(currentMaxId); i++) {
      const currentKeys = Object.keys(this.object);
      // console.log(currentKeys);
      if (!currentKeys.includes(String(i))) {
        // console.log("current keys doesn't include", i);
        this.id = String(i);
        return;
      }
    }
    this.id = String(parseInt(currentMaxId) + 1);
    return;
  }
  addMovie(nameIn, genreIn, yearIn, directorIn) {
    this.object = {
      ...this.object,
      [this.id]: {
        id: this.id,
        name: nameIn,
        genre: genreIn,
        year: yearIn,
        director: directorIn,
      },
    };
    this.getNextId();
  }
  deleteMovie(id) {
    delete this.object[String(id)];
    this.getNextId();
  }
  updateMovie(
    idMovie,
    { name: nameIn, genre: genreIn, year: yearIn, director: directorIn },
  ) {
    const oldMovie = this.getMovieById(idMovie);
    let newMovie = {
      id: idMovie,
      name: nameIn || oldMovie.name,
      genre: genreIn || oldMovie.genre,
      year: yearIn || oldMovie.year,
      director: directorIn || oldMovie.director,
    };
    this.object[idMovie] = newMovie;
  }
  getMovieById(id) {
    return this.object[id];
  }
  getAllMovies() {
    return this.object;
  }
  writeJsonFile() {
    fs.writeFile(
      path.join(__dirname, "./movies.json"),
      JSON.stringify(this.object, null, 4),
      "utf-8",
      (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("file `movies.json` written successfully.");
        }
      },
    );
  }
}

module.exports = new Movies();
