const http = require("http");
const fs = require("fs");

// TODO: wrap the next block inside a function

let jsonObject;
let jsonFile = fs.readFile("./data/anime.json", "utf8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    jsonObject = data;
  }
});

// server
const server = http.createServer(function (req, res) {
  // Home Page
  if (req.url == "/" && req.method === "GET") {
    // Serve index.html
    fs.readFile("./public/index.html", "utf-8", (err, html) => {
      if (err) {
        // TODO: manage error
        console.log(err);
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
        console.log("'./public/index.html' was served.");
      }
    });
  } else if (req.url === "/css/style.css" && req.method === "GET") {
    // Serve style.css
    fs.readFile("./public/css/style.css", "utf-8", (err, css) => {
      if (err) {
        // TODO: manage error
        console.log(err);
      } else {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(css);
        console.log("'./public/css/style.css' was served.");
      }
    });
  } else if (req.url === "/js/main.js" && req.method === "GET") {
    // Serve main.js
    fs.readFile("./public/js/main.js", "utf-8", (err, script) => {
      if (err) {
        console.log(err);
        // TODO: manage error
      } else {
        res.writeHead(200, { "Content-Type": "application/javascript" });
        res.end(script);
        console.log("'./public/js/main.js' was served.");
      }
    });
  } else if (req.url.startsWith("/anime")) {
    // End Points
    if (req.method === "GET") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("This is the anime page");
    } else if (req.method === "POST") {
    } else if (req.method === "PUT") {
    } else if (req.method === "DELETE") {
    }
  }
});

// run server
server.listen(8000, "localhost", () => {
  console.log("Server is running on http://localhost:8000");
});
