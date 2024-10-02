const express = require("express");
const path = require("node:path");
const moviesRouter = require("./routes/moviesRoutes.js");
const methodOverride = require("method-override");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

// app level middlewares
app.use(express.static("./public"));

// set view engine (ejs)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use("/", moviesRouter);

app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

// Global error handler
// app.use((err, req, res, next) => {
//   console.error(err);
//   // is this a good idea?
//   res.status(err.statusCode || 500).send(err.message);
// });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// for testing purposes
module.exports = app;
