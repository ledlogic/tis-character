/* TIS Tropes */

tis.tropes = {
	list:[],
	init: function() {
		tis.log("tis.tropes.init");
		tis.tropes.request();
	},
	request: function() {
		tis.log("tis.tropes.request");
		var csv = "data/tis-tropes.csv";
		tis.log("loading data from csv[" + csv + "]");
		
		Papa.parse(csv, {
			delimiter: ",",
			download: true,
			header: true,
			complete: function(d) {
				tis.tropes.response(d);
			},
			encoding: "UTF-8"
		});
	},
	response: function(d) {
		tis.log("tis.tropes.response");
		var data = d.data;
		var list = tis.tropes.list;
		for (var i=0; i<data.length; i++) {
			var datum = data[i];
			//tis.log(["datum", datum]);
			list[list.length++] = datum;
		}	
		//tis.log(["list", list]);
		setTimeout(tis.tropes.randomize, 10);
	},
	randomize: function() {
		tis.log("tis.tropes.randomize");
		if (!tis.species.selected) {
			setTimeout(tis.tropes.randomize, 10);
			return;
		}

		var trope = tis.species.randomTrope();		
		if (!trope) {
			var list = tis.tropes.list;
			var index = tis.math.dieZ(list.length);
			trope = list[index];
		}
		
		tis.tropes.set(trope);
	},
	set: function(trope) {
		tis.log(["tis.tropes.set, trope", trope]);
		$("#tis_trope").val(trope.Name);
		tis.stats.set(trope.Stats);
	},
	findByName: function(name) {
		var ret = _.find(tis.tropes.list, function(test) {
			return test.Name == name;
		});
		return ret;
	}
};