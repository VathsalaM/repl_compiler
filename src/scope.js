var Scope = function(){
	this.statements = [];
	this.identifiers = [{}];
};

Scope.prototype = {
	statementLength : function(){
		return this.statements.length;
		},
	addStatement : function(statement){
		statement.replaceIdentifiers(this.identifiers);
		if(statement.isAssignment()){
			var variable = statement.evaluate();
			this.identifiers[0][variable.getName()] = variable.getValue();
		};
		this.statements.push(statement);
	},
	addStatements : function(statements){
		var that = this;
		statements.forEach(function(statement){
			that.addStatement(statement);
		})
	},
	replaceIdentifiers : function(identifiers){
		var identifiers = this.identifiers.concat(identifiers);
		this.statements.forEach(function(statement){
			statement.replaceIdentifiers(identifiers);
		});
	},
	evaluate : function(){
		var result ;
		this.statements.forEach(function(statement){
				result = statement.evaluate();
		});
		return result;
	},
	isAssignment : function(){
		return false;
	}	
}

module.exports = Scope;