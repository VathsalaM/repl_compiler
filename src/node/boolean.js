var BooleanNode = function(value){
	this.value = value;
	this.type = "boolean";
};

BooleanNode.prototype = {
	replaceIdentifiers : function(){

	},
	replaceValue : function(){

	},
	evaluate : function(){
		return this;
	},
	getName : function(){
		return this.value.toString();
	},
	getValue : function(){
		return this.value;
	}
}

module.exports = BooleanNode;