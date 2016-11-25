var readline = require('readline');
var parse = require("./grammer").parse;
var Scope = require('./src/scope.js');

function startREPL(){
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false,
        prompt:">"
    });
    
    var statement = '';
    var scope = new Scope();
    var statementStarted;
    console.log("============START============");
    process.stdout.write('> ');
    rl.on('line', function(line){
        if (line !== null){
            var length = line.length;
            statement += line.substr(0,length);
            if(line[length-1]==")" || !statementStarted){
                scope = parse(statement,scope);
                console.log(scope.evaluate().value);
                statement = '';
            }else{
                statement += " "; 
            }
        };
        process.stdout.write('> ');
    });
};

startREPL();