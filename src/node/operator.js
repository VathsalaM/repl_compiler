var utils = require('./utils.js');

var OperatorNode = function(value){
    this.value = value;
    this.type = "operator";
    this.isParent;
    this.evaluate = utils[value].eval;
};

OperatorNode.prototype = {
	isValue : function(otherValue){
		return this.value==otherValue;
	},
	replaceIdentifiers : function(identifiers){
		this.value = identifiers[this.name];
	},
	represent : function(){
		return this.value;
	},
	isAssignment : function(){
		return false;
	}			
};

module.exports = OperatorNode;

