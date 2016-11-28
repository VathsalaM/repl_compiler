var NumberNode = require('./number.js');

var IdentifierNode = function(name){
	this.name = name;
	this.value;
    this.type = "identifier";
    this.isParent;
    this.isAssigned;
};

var error = function(value){
	return new ReferenceError(value+" is not defined");
}

IdentifierNode.prototype = {
	isValue : function(otherValue){
		return this.value==otherValue;
	},
	evaluate : function(){
		if(this.value || !this.isAssigned){
			return this;
		}
		return error(this.name);
	},
	replaceIdentifiers : function(identifiers){
		for(var i=0;i<identifiers.length;i++){
			var value = identifiers[i][this.name];
			if(value){
				this.value = value;
				return;
			};
		};
		if(!value){
			return error(this.name);
		}
	},
	represent : function(){
		return this.value||this.name;
	},
	isAssignment : function(){
		return false;
	},
	replaceValue : function(newValue){
		this.isAssigned = true;
		this.value = newValue;
		return this;
	},
	getName : function(){
		return this.name;
	},
	getValue : function(){
		return this.value;
	}
};

module.exports = IdentifierNode;