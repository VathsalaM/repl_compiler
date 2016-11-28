var fs = require('fs');
var parse = require("./grammer").parse;

var newScope = require('./src/scope.js');

var compiler = function(){
	var statement = fs.readFileSync('./text','utf8');
	scope = parse(statement,newScope([]));
	scope.evaluate();
};

compiler();