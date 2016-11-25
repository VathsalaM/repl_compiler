var statementLength = function(){
	return this.statements.length;
};

var addStatement = function(statement){
	statement.replaceIdentifiers(this.identifiers);
	if(statement.isAssignment()){
		var variable = statement.evaluate();
		this.identifiers[0][variable.getName()] = variable.getValue();
	};
	this.statements.push(statement);
};

var replaceIdentifiers = function(){
};

var evaluate = function(){
	var result ;
	this.statements.forEach(function(statement){
			result = statement.evaluate();
	});
	return result;
}

var isAssignment = function(){
	return false;
}

var Scope = function(identifiers){
	this.statements = [];
	this.identifiers = identifiers;
};

Scope.prototype = {
	statementLength : statementLength,
	addStatement : addStatement,
	evaluate : evaluate,
	replaceIdentifiers : replaceIdentifiers,
	isAssignment : isAssignment
}


var newScope = function(globalIdentifiers){
	var identifiers = [{}];
	if(globalIdentifiers){
		identifiers.push(globalIdentifiers);
	}
	return new Scope(identifiers);
};

module.exports = newScope;