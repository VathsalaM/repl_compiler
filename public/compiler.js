var evaluateClojure = function(){
	var statement = $("#clojure").val();
	console.log(statement);
  	$.post('/evaluate', {statement:statement}, function(res) {
  	 	$("#clojureResult").val(res.value.toString());
  	}, 'json');
};