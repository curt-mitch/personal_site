'use strict';

var express = require('express');
var logger = require('morgan');
var path = require('path');
var http = require('http');
var fs = require('fs');
var helmet = require('helmet');

var app = express();

app.use(logger('short'));
app.use(helmet());

var publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

app.get('/about', function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.statusCode = 200;
  res.sendFile(publicPath + '/about.html');
});

app.use(function (req, res) {
  res.statusCode = 404;
  res.end('404 page');
});

http.createServer(app).listen(3000);
