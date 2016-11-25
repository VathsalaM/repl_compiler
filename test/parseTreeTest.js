var assert = require('chai').assert;
var newParseTree = require('../src/parseTree.js');
var node = require('../src/node/node.js');

describe("ParseTree",function(){
	describe("new",function(){
		it("should create new parse tree with a node and its child",function(){
		    var actual = newParseTree("+",[1]);
		    var expected = {node:"+",children:[1]}
			assert.deepEqual(actual.node,expected.node);
			assert.deepEqual(actual.children,expected.children);
		});
	    it("should create new parse tree with a node and its children",function(){
	        var actual = newParseTree("+",[1,2,3,4]);
	        var expected = {node:"+",children:[1,2,3,4]}
	        assert.deepEqual(actual.node,expected.node);
	        assert.deepEqual(actual.children,expected.children);
	    });
	});

	describe("evaluate",function(){
	    it("should evaluate the tree and return result",function(){
	        var plus = new node.operator("+");
	        var arg1 = new node.number(1);
	        var arg2 = new node.number(2);
	        var actual = newParseTree(plus,[arg1,arg2]).evaluate();
	        assert.ok(actual.isValue(3));
	    });
	});

	// describe("represent",function(){
	//     it("should return the tree in string format ",function(){
	//         var plus = new node.operator("+");
	//         var arg1 = new node.number(1);
	//         var arg2 = new node.number(2);
	//         var actual = newParseTree(plus,arg1,arg2).represent();
	//         var expected = "1+2";
	//         assert.equal(actual,expected);
	//     });
	// });

	describe("replaceIdentifiers",function(){
	    it("should replace all identifiers with their values",function(){
	        var plus = new node.operator("+");
	        var arg1 = new node.number(1);
	        var arg2 = new node.identifier("x");
	        var actual = newParseTree(plus,[arg1,arg2]);
	        actual.replaceIdentifiers([{"x":2}]);
	        var expected = "1+2";
	        assert.equal(actual.represent(),expected);
	    });
	});

	// describe("toJS",function(){
	//     it("should return console.log if it is not assignment",function(){
	//         var plus = new node.operator("+");
	//         var arg1 = new node.number(1);
	//         var arg2 = node("identifier","x");
	//         var actual = newParseTree(plus,arg1,arg2);
	//         var expected = "console.log(1+x);";
	//         assert.equal(actual.toJS(),expected);
	//     });
	//     it("should return var if it is assignment",function(){
	//         var plus = new node.operator("+");
	//         var arg1 = new node.number(1);
	//         var arg2 = new node.number(2);
	//         var parseTree = newParseTree(plus,arg1,arg2);
	//         var actual = newParseTree(new node.operator("="),node("identifier","x"),parseTree);
	//         var expected = "var x=(1+2);";
	//         assert.equal(actual.toJS(),expected);
	//     });
	// });
});