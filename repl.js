var Scope = require('./src/scope.js');
var parse = require("./grammer").parse;

function startREPL(){
    process.stdin.setEncoding('utf8');
    var statement = '';
    var scope = new Scope();
    process.stdin.on('readable', function() {
        var temp = process.stdin.read();
        if (temp !== null){
            var length = temp.length;
            statement += temp.substr(0,length-1);
            if(temp[length-2]==")"){
                scope = parse(statement,scope);
                console.log('->',scope.value);
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