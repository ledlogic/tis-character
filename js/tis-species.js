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
		var json = "data/tis-species.json";
		tis.log("loading data from json[" + json + "]");
		
		$.ajax({
			url: json,
			dataType: "json",
		}).done(function(d) {
			tis.species.response(d);
		});		
	},
	response: function(data) {
		tis.log("tis.species.response");
		tis.species.list = data;
		tis.log(["tis.species.list", tis.species.list]);
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
		
		// text
		$("#tis_species_name").val(d.Name);
		$("#tis_species_description").html(d.Description);
		$("#tis_species_drawback").val(d.Drawback);
		
		// adjustments
		
		_.each(d.Adjustments, function(adjustment, index) {
			var stat = adjustment.stat;
			var mod = adjustment.mod;
			tis.log("stat[" + stat + "], mod[" + mod + "]");
			tis.stats.addMod(stat, mod);
		});
		
		// gender		
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