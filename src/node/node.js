var OperatorNode = require('./operator.js');
var IdentifierNode = require('./identifier.js');
var NumberNode = require('./number.js');

var node = {
	operator : OperatorNode,
	number : NumberNode,
	identifier : IdentifierNode
};

module.exports = node;