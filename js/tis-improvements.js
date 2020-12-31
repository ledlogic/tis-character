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
	randomSpeciesSuggestedImprovement: function() {
		var improvement = null;
		var list = tis.species.selected.Improvements;
		if (list.length) {
			var index = tis.math.dieZ(list.length);
			var name = list[index];
			improvement = tis.improvements.findByName(name);
			if (!improvement) {
				alert("Could not find improvement, name[" + name + "]");
			}
			var addImprovement = (tis.improvements.points >= improvement.IP)
				&& !tis.improvements.hasImprovement(improvement)
				&& tis.improvements.hasRequirement(improvement.Requirement)
			;	
		}
		if (!addImprovement) {
			improvement = null;
		}
		return improvement;
	},
	randomImprovement: function() {
		var list = tis.improvements.list;
		var index = tis.math.dieZ(list.length);
		var improvement = list[index];
		var addImprovement = (tis.improvements.points >= improvement.IP)
			&& !tis.improvements.hasImprovement(improvement)
			&& tis.improvements.hasRequirement(improvement.Requirement)
		;
		if (!addImprovement) {
			improvement = null;
		}
		return improvement;
	},
	randomize: function() {
		tis.log("tis.improvements.randomize");
		
		// select a random improvement from the selected species' suggested improvements list
		var improvement = tis.improvements.randomSpeciesSuggestedImprovement();
				
		// select a random improvement from the general improvement list	
		if (!improvement) {
			improvement = tis.improvements.randomImprovement();
		}		
		
		if (improvement) {
			tis.improvements.points -= improvement.IP;
			tis.improvements.selected.push(improvement);
		}
		
		if (tis.improvements.points > 0 && tis.improvements.selected.length < 10) {
			setTimeout(tis.improvements.randomize, 10);
		} else {
			tis.improvements.sort();
			tis.improvements.render();
		}		
	},
	hasImprovement: function(improvement) {
		var ret = false;
		_.each(tis.improvements.selected, function(test) {
			ret |= test.Name == improvement.Name;
		});
		return ret;
	},
	hasRequirement: function(req) {
		var ret = true;
		if (req) {
			ret = false;
			_.each(tis.improvements.selected, function(test) {
				ret |= test.Name == req;
			});
		}
		return ret;
	},
	render: function() {
		_.each(tis.improvements.selected, function(improvement, index) {
			var key = (index < 10 ? "0" : "") + index;
			$("#tis_improvements_cost_" + key).val(improvement.IP);
			$("#tis_improvements_name_" + key).html(improvement.Name);
			$("#tis_improvements_description_" + key).html(improvement.Description);
			$("#tis_improvement_points").val(tis.improvements.points);
		});
	},
	sort: function() {
		tis.improvements.selected = _.sortBy(tis.improvements.selected, function(improvement) {
			return improvement.Name;
		});
	},
	findByName: function(name) {
		var ret = _.find(tis.improvements.list, function(test) {
			return test.Name == name;
		});
		return ret;
	}
};