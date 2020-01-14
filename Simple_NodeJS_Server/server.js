let http = require("http");
let fs = require("fs");
let url = require("url");

const availableRoutes = ["./index.html", "./contact-me.html", "./about.html"];

http
  .createServer(function(req, res) {
    let myUrl = url.parse(req.url, true);
    let filename;
    if (myUrl.pathname == "/") {
      filename = "index.html";
    } else {
      filename = "." + myUrl.pathname + ".html";
    }

    if (!availableRoutes.includes(filename)) {
      console.log(filename);
      filename = "./404.html";
    }

    fs.readFile(filename, function(err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("404 Not Found");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  })
  .listen(8080);
