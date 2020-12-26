/* TIS Species */

tis.species = {
	list:[],
	init: function() {
		tis.log("tis.species.init");
		tis.species.request();
		tis.species.callback = tis.species.randomize;
	},
	request: function() {
		tis.log("tis.species.request");
		var csv = "data/tis-species.csv";
		tis.log("loading data from csv[" + csv + "]");
		
		Papa.parse(csv, {
			delimiter: ",",
			download: true,
			header: true,
			complete: function(d) {
				tis.species.response(d);
			},
			encoding: "UTF-8"
		});
	},
	response: function(d, n) {
		tis.log("tis.species.response");
		var data = d.data;
		var list = tis.species.list;
		for (var i=0; i<data.length; i++) {
			var datum = data[i];
			//tis.log(["datum", datum]);
			list[list.length++] = datum;
		}	
		//tis.log(["list", list]);
		setTimeout(tis.species.callback, 10);
	},
	randomize: function() {
		tis.log("tis.species.response");
		var list = tis.species.list;
		var index = tis.math.dieZ(list.length);
		var species = list[index];
		tis.species.set(species);
	},
	set: function(d) {
		tis.log(["tis.species.set, d", d]);
		$("#tis_species_name").val(d.Name);
		$("#tis_species_description").html(d.Description);
		$("#tis_species_drawback").val(d.Drawback);
		
		var gender = "";
		switch (d.Name) {
			case "Humans":
			  var index = tis.math.dieZ(2);
			  if (index == 1) {
			  	gender = "female";
			  } else {
			  	gender = "male";
			  }
		      break;
		    default:
		      gender = "alien";
		      break;
		 }
		 $("#tis_gender").val(gender);
		 $("#tis_gender").trigger("change");
	}
};