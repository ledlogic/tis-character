/* TIS Stats */

tis.stats = {
	names: ["Fight","Brains","Charm","Flight","Brawn","Grit"],
	levels: [20, 12, 10, 8, 6, 4],
	mods: [],
	map: {},
	init: function() {
		tis.log("tis.stats.init");
		var mods = tis.stats.mods;
		_.each(tis.stats.names, function(name) {
			mods[name] = 0;
		});
	},
	set: function(st) {
		tis.log(["tis.stats.set", st]);
		if (st) {
			var stats = st.split(" ");
			for (var i=0; i<stats.length; i++) {
				var name = stats[i];
				var die = tis.stats.levels[i];
				var mod = tis.stats.mods[stats[i]];
				tis.log("mod[" + mod + "]");
				var stat = {
					name: name,
					die: die,
					mod: mod
				}
				tis.stats.map[name] = stat;
				tis.stats.renderStat(stat);
			}		
		}
	},
	renderStat: function(stat) {
		var name = stat.name;
		var die = stat.die;
		var mod = stat.mod;
		
		$("#tis_" + name.toLowerCase()).val(die);
		var modStr = (mod > -1 ? "+" : "") + mod;
		$("#tis_" + name.toLowerCase() + "_mod").val(modStr);
	},
	addMod: function(stat, mod) {
		tis.stats.mods[stat] += mod;
		var stat = tis.stats.map[stat];
		stat.mod += mod;
		tis.stats.renderStat(stat);
	}
};