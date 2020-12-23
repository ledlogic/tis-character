/* TIS Stats */

tis.stats = {
	levels: [20, 12, 10, 8, 6, 4],
	map: {},
	init: function() {
		tis.log("tis.stats.init");
	},
	set: function(arr) {
		tis.log(["arr", arr]);
		var stats = arr.split(" ");
		
		for (var i=0; i<stats.length; i++) {
			var name = stats[i].toLowerCase();
			var die = tis.stats.levels[i];
			var stat = {
				name: name,
				die: die
			}
			tis.stats.map[name] = stat;
			$("#tis_" + name).val(die);
		}		
	}
};