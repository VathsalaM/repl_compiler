var assert = require('chai').assert;
var node = require('../src/node/node.js');

describe("Node",function(){
	describe("operator",function(){
		describe("replaceIdentifiers",function(){
			it("should not do anything",function(){
				var operator = new node.operator("+");
				assert.ok(operator.isValue('+'));
				operator.replaceIdentifiers({x:2});
				assert.ok(operator.isValue());
			});
		});
		describe("evaluate",function(){
			it("should take two value and return the answer in number node",function(){
				var operator = new node.operator("+");
				var actual = operator.evaluate(new node.number(1),new node.number(2));
				assert.ok(actual.isValue(3));
			});
			it("should consider 0 if the arguments are not present",function(){
				var operator = new node.operator("+");
				var actual = operator.evaluate(new node.number(1));
				assert.ok(actual.isValue(1));
			});
		});
	});
	describe("number",function(){
		describe("replaceIdentifiers",function(){
			it("should not do anything",function(){
				var number = new node.number(4);
				assert.ok(number.isValue(4));
				assert.notOk(number.isValue(2));
				number.replaceIdentifiers({x:2});
				assert.ok(number.isValue(4));
			});
		});
		describe("evaluate",function(){
			it("should return itslef",function(){
				var actual = new node.number(1).evaluate();
				assert.ok(actual.isValue(1));
			});
		});
	});
	describe("identifier",function(){
		describe("replaceIdentifiers",function(){
			it("should replace the value of identifier",function(){
				var identifier = new node.identifier("x");
				assert.ok(identifier.isValue());
				assert.notOk(identifier.isValue(2));
				identifier.replaceIdentifiers([{x:2}]);
				assert.ok(identifier.isValue(2));
			});
			it("should replace the value of outer scope",function(){
				var identifier = new node.identifier("x");
				assert.ok(identifier.isValue());
				assert.notOk(identifier.isValue(2));
				identifier.replaceIdentifiers([{},{x:2}]);
				assert.ok(identifier.isValue(2));
			})
		});
		describe("evaluate",function(){
			it("should return number node",function(){
				var identifier = new node.identifier("x");
				identifier.replaceIdentifiers([{x:2}]);
				var actual = identifier.evaluate();
				assert.ok(actual.isValue(2));
				assert.notInstanceOf(actual,Error);
			});
			// it("should return err when there is no value",function(){
			// 	var actual = new node.identifier("x").evaluate();
			// 	assert.instanceOf(actual,Error);
			// });
		});
	});
});