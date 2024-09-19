const http = require("http");
const fs = require("fs");
const url = require("url");
const { queryObjects } = require("v8");

function main() {
  // server
  const server = http.createServer(function (req, res) {
    /* ************************************************************************
     * Home Page
     * ***********************************************************************/
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

      /* **********************************************************************
       * End Points
       * *********************************************************************/
    } else if (req.url.startsWith("/anime")) {
      // get url requested
      const requestedUrl = url.parse(req.url);
      const requestedUrlParams = new URLSearchParams(requestedUrl.path);
      console.log(requestedUrlParams);
      //console.log(requestedUrl);
      /*
       * READ
       */
      if (req.method === "GET") {
        // if it is the main path return complete json file
        if (req.url === "/anime") {
          // TODO: find appropriate context-type for json
          getJsonFile((jsonFile) => {
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(jsonFile);
          });
          //  console.log(`GET request to '${requestedUrl.href}' was received.`);
        } else {
          /* *****************************************************************
           * Implementation with Query Strings
           * // TODO: I was wrong about query strings, it is a SEARCH.
           * I must reimplement what I have so far.
           * - id is not mandatory (but useful to check if is given for efficiency
           * - Reimplement all the code bellow using the URLSearchParams class
           * ****************************************************************/
          let queryObject = getQueryObject(requestedUrl);

          if (Object.keys(queryObject).length === 1) {
            if (checkIfIdParam(queryObject)) {
              // if id was proportioned
              getJsonFile((jsonFile) => {
                const jsonObject = JSON.parse(jsonFile);

                // TODO: check when id is not in json file
                const subObjectString = JSON.stringify(
                  // get the specific anime requested
                  jsonObject[queryObject.id],
                );

                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end(subObjectString);
              });
            } else {
              getJsonFile((jsonFile) => {
                const jsonObject = JSON.parse(jsonFile);
                console.log(jsonObject);
                let keyValuePair = [];
                for (const key in queryObject) {
                  keyValuePair.push(key);
                  keyValuePair.push(queryObject[key]);
                }

                let match = [];
                for (const key in jsonObject) {
                  if (jsonObject[key][keyValuePair[0]] === keyValuePair[1]) {
                    match.push(JSON.stringify(jsonObject[key]));
                  }
                }
                res.writeHead(202, { "Content-Type": "text/plain" });
                res.end(...match);
              });
            }
            // if specific anime's properties were requested
          // } else if (Object.keys(queryObject).length > 1) {
          //   getJsonFile((jsonFile) => {
          //     const jsonObject = JSON.parse(jsonFile);

          //     let requestedProperties = [];
          //     for (const elem of jsonObject[queryObject.id]) {
          //       requestedProperties.push(JSON.stringify(elem));
          //     }

          //     res.writeHead(200, { "Content-Type": "text/plain" });
          //     res.end(...requestedProperties);
          //     // TODO: read specific properties of a anime.
          //   });
          // }

          console.log(`GET request to '${requestedUrl.href}' was received.`);
        }
        // serve something to web browser while this section is developed
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
}

function getJsonFile(callback) {
  fs.readFile("./data/anime.json", "utf-8", (err, jsonFile) => {
    if (err) {
      // TODO: manage error
      console.log("While reading the json file, the following error ocurred");
      console.log(err);
    } else {
      callback(jsonFile);
    }
  });
}

function getQueryObject(requestedUrl) {
  const queryArray = requestedUrl.query.split("&");

  let queryObject = {};

  for (let i = 0; i < queryArray.length; i++) {
    [a, b] = queryArray[i].split("=");
    queryObject[a] = b;
  }

  return queryObject;
}

function checkIfIdParam(queryObject) {
  for (const elem in queryObject) {
    if (elem === "id") {
      return true;
    }
  }
  return false;
}

main();
