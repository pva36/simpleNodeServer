const express = require("express");
// TODO: implement required routers
const moviesRouter = require("./routes/moviesRoutes.js");

const app = express();

// app level middlewares
app.use(express.static("./public"));

app.get("/error", (req, res) => {
  throw new Error("error");
});

app.use("/movies", moviesRouter);

app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
