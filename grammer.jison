/* lexical grammar */

%{
	var newParseTree = require('./src/parseTree.js');
	var node = require('./src/node/node.js');
	var Scope = require('./src/scope.js');
	var statement;
	var args = [];
%}

%lex
%%
\s+         							{/* skip whitespace */}
"if"										return '?';
"def"									return 'DEF';
"print"									return 'print';
[0-9]+("."[0-9]+)?\b					return 'NUMBER';
[a-z]+		                     	    return 'IDENTIFIER';
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
">"										return '>';
"<"										return '<';
<<EOF>>        							return 'EOF';
.             							return 'INVALID';

/lex

%left '+' '-'
%left '*' '/'
%left '^'
%right '!'
%right '%'

%start EX

%%

EX 
	: expression_list EOF 
		{	$$ = new Scope();
			$$.addStatements([].concat($1));
			return $$; 
		}
	;

expression_list
	:   expression
		 	{ 
		 		$$ = $1;
		 	}
	|	expression_list expression
			{ 
				$$ = [].concat($1,$2);
			}
	;

definition : '+'
	| '-'
	| '*'
	| '/'
	| '!'
	| '^'
	| '='
	| 'DEF'
	| '?'
	| '>'
	| '<'
	| 'print'
	;

argument :  "(" expression_list ")"
			{	
			 	$$ = new Scope();
			 	$$.addStatements([].concat($2));
			}
			| expression {}
		 	| NUMBER 
			 	{$$=new node.number(Number($1));}
		 	| IDENTIFIER
		 		{$$=new node.identifier($1);}
		 	;

arg_list : argument {
			args.push($1);
			$$ = $1;
			}
		 | arg_list argument {
		 	args.push($2);
		 	$$ = [].concat($1,$2);
		 }
		 ;

expression : "(" definition arg_list ")"
				{  
					$$ = new newParseTree(new node.operator($2),[].concat($3)); 
				}
			;