/* TIS Stats */

tis.stats = {
	levels: [20, 12, 10, 8, 6, 4],
	mods: [0, 0, 0, 0, 0, 0],
	map: {},
	init: function() {
		tis.log("tis.stats.init");
	},
	set: function(st, m) {
		tis.log(["st", st]);
		tis.log(["m", m]);
		
		if (st) {
			var stats = st.split(" ");
			for (var i=0; i<stats.length; i++) {
				var name = stats[i].toLowerCase();
				var die = tis.stats.levels[i];
				var mod = tis.stats.mods[i];
				var stat = {
					name: name,
					die: die,
					mod: mod
				}
				tis.stats.map[name] = stat;
				$("#tis_" + name).val(die);
				var modStr = (mod > -1 ? "+" : "") + mod;
				$("#tis_" + name + "_mod").val(modStr);
			}		
		}
	}
};