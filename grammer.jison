/* lexical grammar */

%{
	var newParseTree = require('./src/parseTree.js');
	var node = require('./src/node/node.js');
	var statement;
	var arg_list = [];
%}

%lex
%%
\s+         							{/* skip whitespace */}
[0-9]+("."[0-9]+)?\b					return 'NUMBER'
[a-zA-Z]+		                     	return 'IDENTIFIER'
"-"           							return '-';
"/"           							return '/';
"+"										return '+';
"*"           							return '*';
"^"           							return '^';
"!"										return '!';
"%"										return '%';
"("           							return '(';
")"           							return ')';
"="										return '=';
<<EOF>>        							return 'EOF';
.             							return 'INVALID';

/lex

%left '+' '-'
%left '*' '/'
%left '^'
%right '!'
%right '%'

%parse-param scope

%start expression

%%

expression : e EOF{
	scope.addStatement(statement);
	return scope;
};

def : '+'
	| '-'
	| '*'
	| '/'
	| '!'
	| '^'
	| '='
	;

argument : e
			{}
		 | NUMBER 
		 	{$$=new node.number(Number($1));}
		 | IDENTIFIER
		 	{$$=new node.identifier($1);}
		 ;

arg_list : argument {arg_list.push($1);}
		 | arg_list argument {arg_list.push($2);}
		 ;

e : "(" def arg_list ")"
		{statement = new newParseTree(new node.operator($2),arg_list); arg_list = [];}
  | "(" argument ")"
  		{statement = $2;}
;