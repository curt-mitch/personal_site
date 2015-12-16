var express = require("express");
var logger = require("morgan");
var path = require("path");
var http = require("http");

var app = express();

app.use(logger("short"));

var publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

app.get("/about", function (request, response) {
  response.end("About Me page!");
});

app.use(function (request, response) {
  response.statusCode = 404;
  response.end("404 page");
});

http.createServer(app).listen(3000);