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
	response: function(d, n) {
		tis.log("tis.tropes.response");
		var data = d.data;
		var list = tis.tropes.list;
		for (var i=0; i<data.length; i++) {
			var datum = data[i];
			//tis.log(["datum", datum]);
			list[list.length++] = datum;
		}	
		//tis.log(["list", list]);
		var index = tis.math.dieZ(list.length);
		var trope = list[index];
		tis.tropes.set(trope);
	},
	set: function(d) {
		tis.log(["d", d]);
		$("#tis_trope").val(d.Name);
		tis.stats.set(d.Stats);
	}
};