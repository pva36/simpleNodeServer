const fs = require("node:fs");

const getMaxId = (object) => {
  let keys = Object.keys(object);
  let maxValue = 0;
  for (const id of keys) {
    if (parseInt(id) > maxValue) {
      maxValue = parseInt(id);
    }
  }

  return maxValue;
};

class Movies {
  constructor() {
    this.object = JSON.parse(fs.readFileSync("./movies.json", "utf-8"));
    this.id = getMaxId(this.object) + 1;
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
    this.id++;
  }
}

// module.exports = new Movies();

// test
const movies = new Movies();
// console.log(movies.id);
// console.log(movies.object);

// addMovie
// movies.addMovie("nombre", "genero", "año", "director");
// console.log(movies.object);
// console.log(movies.id);
