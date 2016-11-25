var fs = require('fs');
var bodyParser = require('body-parser');
var parse = require("../grammer").parse;
var newScope = require('../src/scope.js');

var page = fs.readFileSync('./public/index.html', "utf8");

var express = require('express');
var app = express();

app.use(function(req, res, next){
  console.log(req.method, req.url);
  next();
});

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/evaluate', function(req, res) {
	var statement = req.body.statement;
	var scope = parse(statement,newScope([]));
	var value = scope.evaluate().value;
	res.send({value:value});
});

module.exports = app;