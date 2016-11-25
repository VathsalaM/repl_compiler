var NumberNode = require('./number.js');

var factorial = function(a){
	return (a==1)?a:factorial(a-1);
}

var add = function(a,b){
	return new NumberNode(a.value+(b?b.value:0));
};

var sub = function(a,b){
	return new NumberNode(a.value-b.value);
};

var mul = function(a,b){
	return new NumberNode(a.value*b.value);
};

var div = function(a,b){
	return new NumberNode(a.value/b.value);
};

var assign = function(a,b){
	a.replaceValue(b.value);
	return a;
};

var pow = function(a,b){
	return new NumberNode(Math.pow(a.value,b.value));
};

var fact = function(a,b){
	return new NumberNode(factorial(a.value));
};

// var lessThan = function(a,b){
// 	return new BooleanNode(a.value<b.value);
// };

// var greaterThan = function(a,b){
// 	return new BooleanNode(a.value>b.value);
// };

var operators = {
    "+" : {value:"+",name:"plus",eval:add},
    "-" : {value:"-",name:"minus",eval:sub},
    "*" : {value:"*",name:"times",eval:mul},
    "/" : {value:"/",name:"div",eval:div},
    "=" : {value:"=",name:"assign",eval:assign},
    "^" : {value:"^",name:"pow",eval:pow},
    "!" : {value:"!",name:"fact",eval:fact},
    // "<" : {value:"<",name:"lessThan",eval:lessThan},
    // ">" : {value:">",name:"greaterThan",eval:greaterThan}
};

module.exports = operators;