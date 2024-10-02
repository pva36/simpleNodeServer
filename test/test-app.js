const chai = require("chai");
const chaiHttp = require("chai-http");

const express = require("express");
const path = require("node:path");
const moviesRouter = require("../routes/moviesRoutes.js");
const methodOverride = require("method-override");

const ROOT_DIR = __dirname.replace("/test", "");

chai.use(chaiHttp);

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

// app level middlewares
app.use(express.static(path.join(ROOT_DIR, "/public")));

// set view engine (ejs)
app.set("view engine", "ejs");
app.set("views", path.join(ROOT_DIR, "/views"));

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

describe("Testing server response", () => {
  it("Test that the app's response to a GET request in the root route is 200", (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        if (err) {
          console.error(err);
        }
        chai.expect(res).to.have.status(200);
        done();
      });
  });
});
