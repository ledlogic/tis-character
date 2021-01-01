/* TIS Rarities */

tis.rarities = {
	list:[],
	ready: false,
	init: function() {
		tis.log("tis.rarities.init");
		tis.rarities.request();
	},
	request: function() {
		tis.log("tis.rarities.request");
		var json = "data/tis-rarities.json";
		tis.log("loading data from json[" + json + "]");
		
		$.ajax({
			url: json,
			dataType: "json",
		}).done(function(d) {
			tis.rarities.response(d);
		});		
	},
	response: function(data) {
		tis.log("tis.rarities.response");
		tis.rarities.list = data;
		tis.log(["tis.rarities.list", tis.rarities.list]);
		
		var rarityTotal = 0.0;
		_.each(tis.rarities.list, function(rarity) {
			rarity.Rarity = 2.0 / (rarity.Rmin + rarity.Rmax);
			rarityTotal += rarity.Rarity;
		});
		_.each(tis.rarities.list, function(rarity) {
			rarity.Rf = rarity.Rarity / rarityTotal;
			tis.log(["rarity", rarity]);
		});

		tis.rarities.ready = true;
		//setTimeout(tis.rarities.callback, 10);
	},
	randomRarity: function() {
		var ret = null;
		var r = Math.random();
		_.each(tis.rarities.list, function(rarity) {
			if (!ret && r < rarity.Rf) {
				ret = rarity;
			}
		});
		ret = ret ? ret : tis.rarities.list[tis.rarities.list.length-1];
		return ret;
	}
};