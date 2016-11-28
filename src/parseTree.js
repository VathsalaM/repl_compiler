var ParseTree = function(node,children){
	this.node = node;
	this.children = children;
}

ParseTree.prototype = {
	evaluate : function(){
		var node = this.node;
		if(this.children.length<2){
			var a = this.children[0].evaluate()
			return node.evaluate(a);
		}
		return this.children.reduce(function(a,b){
			var aValue = a.evaluate();
			var bValue = b.evaluate();
			return node.evaluate(aValue,bValue);
		});
	},
	replaceIdentifiers : function(identifiers){
		this.children.forEach(function(child){
			child.replaceIdentifiers(identifiers);
		});
	},
	represent : function(){
		var node = this.node.represent();
		return this.children.reduce(function(a,b){
			return a.represent()+node+b.represent();
		});
	},
	isAssignment : function(){
		return this.node.isValue('def');
	}
};

var newParseTree = function(node,children){
	return new ParseTree(node,children);
}
module.exports = newParseTree;