var assert = require("assert"),
	mixini = require("../index"),
	fs = require("fs"),
	a = fs.readFileSync("./a.ini", "utf8"),
	b = fs.readFileSync("./b.ini", "utf8")
;

var result = mixini(a, b);
console.warn(result);

