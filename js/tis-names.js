/* TIS names */

tis.names = {
	init: function() {
		tis.log("tis.names.init");
		tis.names.alien.request();
		tis.names.female.request();
		tis.names.male.request();
	},
	alien: {
		list: [],
		request: function() {
			tis.log("tis.names.alien.request");
			var csv = "data/tis-names-alien.csv";
			tis.log("loading data from csv[" + csv + "]");
			
			Papa.parse(csv, {
				delimiter: ",",
				download: true,
				header: true,
				complete: function(d) {
					tis.names.alien.response(d);
				},
				encoding: "UTF-8"
			});
		},
		response: function(d, n) {
			tis.log("tis.names.alien.response");
			var data = d.data;
			var list = tis.names.alien.list;
			for (var i=0; i<data.length; i++) {
				var datum = data[i];
				//tis.log(["datum", datum]);
				list[list.length++] = datum;
			}	
			tis.log(["tis.name.alien.list", list]);
		}
	},
	female: {
		list: [],
		request: function() {
			tis.log("tis.names.female.response");
			var csv = "data/tis-names-female.csv";
			tis.log("loading data from csv[" + csv + "]");
			
			Papa.parse(csv, {
				delimiter: ",",
				download: true,
				header: true,
				complete: function(d) {
					tis.names.female.response(d);
				},
				encoding: "UTF-8"
			});
		},
		response: function(d, n) {
			tis.log("tis.names.female.response");
			var data = d.data;
			var list = tis.names.female.list;
			for (var i=0; i<data.length; i++) {
				var datum = data[i];
				//tis.log(["datum", datum]);
				list[list.length++] = datum;
			}	
			tis.log(["tis.names.female.list", list]);
		}
	},
	male: {
		list: [],
		request: function() {
			tis.log("tis.names.male.request");
			var csv = "data/tis-names-male.csv";
			tis.log("loading data from csv[" + csv + "]");
			
			Papa.parse(csv, {
				delimiter: ",",
				download: true,
				header: true,
				complete: function(d) {
					tis.names.male.response(d);
				},
				encoding: "UTF-8"
			});
		},
		response: function(d, n) {
			tis.log("tis.names.male.response");
			var data = d.data;
			var list = tis.names.male.list;
			for (var i=0; i<data.length; i++) {
				var datum = data[i];
				//tis.log(["datum", datum]);
				list[list.length++] = datum;
			}	
			tis.log(["tis.names.male.list", list]);
		}
	}
};