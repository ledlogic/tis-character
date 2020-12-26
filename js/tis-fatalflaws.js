/* TIS Fatal Flaws */
/* @see https://tvtropes.org/pmwiki/pmwiki.php/Main/FatalFlaw */
tis.fatalflaws = {
	list:[],
	init: function() {
		tis.log("tis.fatalflaws.init");
		tis.fatalflaws.request();
	},
	request: function() {
		tis.log("tis.fatalflaws.request");
		var csv = "data/tis-fatalflaws.csv";
		tis.log("loading data from csv[" + csv + "]");
		
		Papa.parse(csv, {
			delimiter: ",",
			download: true,
			header: true,
			complete: function(d) {
				tis.fatalflaws.response(d);
			},
			encoding: "UTF-8"
		});
	},
	response: function(d, n) {
		tis.log("tis.fatalflaws.response");
		var data = d.data;
		var list = tis.fatalflaws.list;
		for (var i=0; i<data.length; i++) {
			var datum = data[i];
			//tis.log(["datum", datum]);
			list[list.length++] = datum;
		}	
		//tis.log(["list", list]);
		var index = tis.math.dieZ(list.length);
		var fatalflaw = list[index];
		tis.fatalflaws.set(fatalflaw);
	},
	set: function(d) {
		tis.log(["d", d]);
		$("#tis_fatalflaw").val(d.Name);
	}
};