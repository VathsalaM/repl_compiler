var evaluateClojure = function(){
	var statement = $("#clojure").val();
  	 $.post('/evaluate', {statement:statement}, function(res) {
  	 	$("#clojureResult").val(res.value.toString());
  	}, 'json');
};