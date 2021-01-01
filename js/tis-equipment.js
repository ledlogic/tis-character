/* TIS Equipment */

tis.equipment = {
	list:[],
	ready: false,
	selected: [],
	init: function() {
		tis.log("tis.equipment.init");
		tis.equipment.request();
		tis.equipment.callback = tis.equipment.randomize;
	},
	request: function() {
		tis.log("tis.equipment.request");
		var json = "data/tis-equipment.json";
		tis.log("loading data from json[" + json + "]");
		
		$.ajax({
			url: json,
			dataType: "json",
		}).done(function(d) {
			tis.equipment.response(d);
		});		
	},
	response: function(data) {
		tis.log("tis.equipment.response");
		tis.equipment.list = data;
		tis.log(["tis.equipment.list", tis.equipment.list]);
		tis.equipment.ready = true;
		setTimeout(tis.equipment.callback, 10);
	},
	randomEquipment: function() {
		var list = tis.equipment.list;
		var index = tis.math.dieZ(list.length);
		var element = list[index];
		var equipmentType = element.Type;
		var examples = element.Examples;
		var index2 = tis.math.dieZ(examples.length);
		var equipmentName = examples[index2];
		var equipmentRarity = tis.rarities.randomRarity();
		var equipmentQuality = tis.qualities.randomQuality();
		var equipment = {
			Type: equipmentType,
			Name: equipmentName,
			Rarity: equipmentRarity,
			Quality: equipmentQuality
		}
		var addEquipment = !tis.equipment.hasEquipment(equipment);
		if (!addEquipment) {
			equipment = null;
		}
		return equipment;
	},
	randomize: function() {
		tis.log("tis.equipment.randomize");
		if (!tis.equipment.ready || !tis.rarities.ready || !tis.qualities.ready) {
			setTimeout(tis.equipment.randomize, 100);
			return;
		}
		
		// select a random equipment
		var equipment = tis.equipment.randomEquipment();
		
		if (equipment) {
			tis.equipment.selected.push(equipment);
		}
		if (tis.equipment.selected.length < 13) {
			setTimeout(tis.equipment.randomize, 10);
		} else {
			tis.equipment.sort();
			tis.equipment.render();
		}		
	},
	hasEquipment: function(equipment) {
		var ret = false;
		_.each(tis.equipment.selected, function(test) {
			ret |= test.Name == equipment.Name;
		});
		return ret;
	},
	render: function() {
		_.each(tis.equipment.selected, function(equipment, index) {
			var key = (index < 9 ? "0" : "") + (index + 1);
			var h = equipment.Type + ": " + equipment.Name + " (" + equipment.Rarity.Abbr + "/" + equipment.Quality.Abbr + ")";
			$("#tis_backpack_" + key).val(h);
		});
	},
	sort: function() {
		tis.equipment.selected = _.sortBy(tis.equipment.selected, function(equipment) {
			return equipment.Type + ": " + equipment.Name;
		});
	}
};