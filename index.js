// literally just a quick shorthand for lodash.merge and ini parsing.

var ini = require("ini"),
	merge = require("lodash.merge")
;

function mixini(/* a, b, c ... */){
	// summary: mix down a series of ini strings
	var parsed = [{}];
	for(var i = 0, l = arguments.length; i < l; i++){
		parsed.push(ini.parse(arguments[i]));
	}
	return merge.apply(this, parsed);
}

module.exports = mixini;