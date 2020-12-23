/* TIS Math */

tis.math = {
	die: function(qty, die, mod) {
		var ret = mod;
		for (var i = 0; i < qty; i++) {
			ret += swn.math.dieN(die);
		}
		return ret;
	},
	dieN: function(die) {
		return Math.floor(Math.random() * die) + 1;
	},
	dieZ: function(die) {
		return Math.floor(Math.random() * die);
	}
};
