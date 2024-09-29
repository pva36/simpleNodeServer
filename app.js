const express = require("express");
const path = require("node:path");
// TODO: implement required routers
const moviesRouter = require("./routes/moviesRoutes.js");

const app = express();

app.use(express.urlencoded({ extended: true }));

// app level middlewares
app.use(express.static("./public"));

// set view engine (ejs)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// testing errors
app.get("/error", (req, res) => {
  throw new Error("error");
});

app.use("/", moviesRouter);

app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  // is this a good idea?
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
