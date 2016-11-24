/* lexical grammar */

%{
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
"def"									return 'DEF';
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
	return scope;
};

e : "(" e ")"
  | e NUMBER
  | NUMBER
;