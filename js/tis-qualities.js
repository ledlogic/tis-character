/* TIS Qualities */

tis.qualities = {
	list:[],
	ready: false,
	init: function() {
		tis.log("tis.qualities.init");
		tis.qualities.request();
	},
	request: function() {
		tis.log("tis.qualities.request");
		var json = "data/tis-qualities.json";
		tis.log("loading data from json[" + json + "]");
		
		$.ajax({
			url: json,
			dataType: "json",
		}).done(function(d) {
			tis.qualities.response(d);
		});		
	},
	response: function(data) {
		tis.log("tis.qualities.response");
		tis.qualities.list = data;
		tis.log(["tis.qualities.list", tis.qualities.list]);
		
		var qualityTotal = 0.0;
		_.each(tis.qualities.list, function(quality) {
			quality.Quality = 2.0 / (quality.Rmin + quality.Rmax);
			qualityTotal += quality.Quality;
		});
		_.each(tis.qualities.list, function(quality) {
			quality.Rf = quality.Quality / qualityTotal;
			tis.log(["quality", quality]);
		});

		tis.qualities.ready = true;
		//setTimeout(tis.rarities.callback, 10);
	},
	randomQuality: function() {
		var ret = null;
		var r = Math.random();
		_.each(tis.qualities.list, function(quality) {
			if (!ret && r < quality.Rf) {
				ret = quality;
			}
		});
		ret = ret ? ret : tis.qualities.list[tis.qualities.list.length-1];
		return ret;
	}
};