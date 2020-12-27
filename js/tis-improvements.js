/* TIS Improvements */

tis.improvements = {
	list: [],
	selected: [],
	points: 10,
	init: function() {
		tis.log("tis.improvements.init");
		tis.improvements.set();
		tis.improvements.request();
		tis.improvements.callback = tis.improvements.randomize;
	},
	set: function(val) {
		if (val) {
			tis.improvements.points = val;
		}
		$("#tis_improvement_points").val(tis.improvements.points);
	},
	request: function() {
		tis.log("tis.improvements.request");
		var csv = "data/tis-improvements.csv";
		tis.log("loading data from csv[" + csv + "]");
		
		Papa.parse(csv, {
			delimiter: ",",
			download: true,
			header: true,
			complete: function(d) {
				tis.improvements.response(d);
			},
			encoding: "UTF-8"
		});
	},
	response: function(d, n) {
		tis.log("tis.improvements.response");
		var data = d.data;
		var list = tis.improvements.list;
		for (var i=0; i<data.length; i++) {
			var datum = data[i];
			//tis.log(["datum", datum]);
			list[list.length++] = datum;
		}	
		//tis.log(["list", list]);
		setTimeout(tis.improvements.callback, 10);
	},
	randomize: function() {
		tis.log("tis.improvements.randomize");
		var list = tis.improvements.list;
		var index = tis.math.dieZ(list.length);
		var improvement = list[index];
		//tis.log(improvement);
		if (tis.improvements.points >= improvement.IP) {
			tis.improvements.points -= improvement.IP;
			tis.improvements.selected.push(improvement);
			var index = tis.improvements.selected.length;
			var key = (index < 10 ? "0" : "") + index;
			$("#tis_improvements_cost_" + key).val(improvement.IP);
			$("#tis_improvements_name_" + key).val(improvement.Name);
			$("#tis_improvements_description_" + key).val(improvement.Description);
			$("#tis_improvement_points").val(tis.improvements.points);
		}
		
		if (tis.improvements.points > 0 && tis.improvements.selected.length < 10) {
			setTimeout(tis.improvements.randomize, 10);
		}
	}
};