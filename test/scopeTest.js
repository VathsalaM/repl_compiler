var assert = require('chai').assert;
var newScope = require('../src/scope.js');
var newParseTree = require('../src/parseTree.js');
var node = require('../src/node/node.js');

describe("Scope",function(){
	it("creates a scope with empty value,statements",function(){
		var scope = newScope();
		assert.isUndefined(scope.value);
		assert.equal(scope.statementLength(),0);
		assert.deepEqual(scope.identifiers,[{}]);
	});

	it("creates a scope with identifiers if provided",function(){
		var identifiers = [{"x":10}];
		var scope = newScope(identifiers);
		assert.isUndefined(scope.value);
		assert.equal(scope.statementLength(),0);
		assert.deepEqual(scope.identifiers,[{},identifiers]);
	});
	
	describe("addStatement",function(){
		it("should add parseTree as statement",function(){
			var scope = newScope();
			var tree = newParseTree(new node.operator("+"),[new node.number(2)]);
			scope.addStatement(tree);
			assert.equal(scope.statementLength(),1);
		});
		it("should add node as statement",function(){
			var scope = newScope();
			scope.addStatement(new node.identifier("x"));
			assert.equal(scope.statementLength(),1);
		});
		it("should add scope as statement",function(){
			var scope = newScope();
			scope.addStatement(newScope());
			assert.equal(scope.statementLength(),1);
		});
	});
	describe("evaluate",function(){
		it("should evaluate the expressions and return a value",function(){
			var scope = newScope();
			var tree = newParseTree(new node.operator("+"),[new node.number(2)]);
			scope.addStatement(tree);
			var actual = scope.evaluate();
			assert.ok(actual.isValue(2));
		});
	});
});