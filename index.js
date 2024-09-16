const http = require("http");

const server = http.createServer(function (req, res) {
  if (req.method === "GET") {
    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("This is the main page");
    } else if (req.url === "/hola") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Hola mi guacho");
    }
  }
});

server.listen(8000, "localhost", () => {
  console.log("Server is running on http://localhost:8000");
});
