(function () {
	if (typeof module !== "undefined" && module !== null) {
		module.exports = function () {
			return function (stylus) {
				return stylus.define("to-upper-case", function (node) {
					var nodeName, val;
					nodeName = node.nodeName;
					val = node.string;
					if (nodeName === "string") {
						return new stylus.nodes.String(val.toUpperCase());
					}
					else if (nodeName === "ident") {
						return new stylus.nodes.Ident(val.toUpperCase());
					}
					else {
						throw new Error("to-upper-case accepts string or ident but got " + nodeName);
					}
				});
			};
		};
	}
}).call(this);
