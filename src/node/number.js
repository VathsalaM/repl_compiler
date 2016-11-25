var nodeUtils = require('./utils.js');

var NumberNode = function(value){
    this.value = value;
    this.type = "number";
    this.isParent;
};

NumberNode.prototype={
	isValue : function(otherValue){
		return this.value==otherValue;
	},
	evaluate : function(){
		return this;
	},
	replaceIdentifiers:function(){

	},
	represent : function(){
		return this.value;
	},
	isAssignment : function(){
		return false;
	}
}

module.exports = NumberNode;

