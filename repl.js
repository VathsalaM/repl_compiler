var Scope = require('./src/scope.js');
var parse = require("./grammer").parse;

function startREPL(){
    process.stdin.setEncoding('utf8');
    var statement = '';
    var scope = new Scope();
    var statementStarted;
    console.log("============START============");
    process.stdin.on('readable', function() {
        var temp = process.stdin.read();
        if (temp !== null){
            var length = temp.length;
            statement += temp.substr(0,length-1);
            if(temp[length-2]==")" || !statementStarted){
                scope = parse(statement,scope);
                console.log('->',scope.evaluate().value);
                statement = '';
            }else{
                statement += " "; 
            }
        };
    });
    process.stdin.on('end', function() {        
        console.log("==========END==========");
    });
}

startREPL();