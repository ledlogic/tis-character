tis.localstorage = {
	getCharacters: function() {
		var charactersItem = localStorage.getItem('tis-characters');
		tis.log(["charactersItem", charactersItem]);
		var characters = charactersItem ? JSON.parse(charactersItem) : [];
		return characters;
	},
	getCharacter: function(timekey) {
		var json = localStorage.getItem(timekey);
		var character = json ? JSON.parse(json) : null;
		return character;
	},
	saveCharacter: function() {
		var improvements = [];
		for (var i=1;i<=11;i++) {
			var key = (i < 10 ? "0" : "") + i;
			improvements.push($("#tis_improvements_name_" + key).text());
		}		
	
		var shiproles = [];
		for (var i=1;i<=11;i++) {
			var key = (i < 10 ? "0" : "") + i;
			shiproles.push($("#tis_ship_roles_" + key).val());
		}		
		
		var records = [];
		for (var i=1;i<=12;i++) {
			var key = (i < 10 ? "0" : "") + i;
			records.push($("#tis_records_" + key).val());
		}
		
		var equipment = [];
		for (var i=1;i<=12;i++) {
			var key = (i < 10 ? "0" : "") + i;
			equipment.push($("#tis_backpack_" + key).val());
		}			
	
		var character = {
			name: $("#tis_name").val(),
			age: $("#tis_age").val(),
			gender: $("#tis_gender").val(),
			species: $("#tis_species_name").val(),
			drawback: $("#tis_species_drawback").val(),
			trope: $("#tis_trope").val(),
			fatalflaw: $("#tis_fatalflaw").val(),
			speciesdescription: $("#tis_species_description").val(),
			credits: $("#tis_credits").val(),
			fight: $("#tis_fight").val(),
			brains: $("#tis_brains").val(),
			charm: $("#tis_charm").val(),
			flight: $("#tis_flight").val(),
			brawn: $("#tis_brawn").val(),
			grit: $("#tis_grit").val(),
			fightmod: $("#tis_fight_mod").val(),
			brainsmod: $("#tis_brains_mod").val(),
			charmmod: $("#tis_charm_mod").val(),
			flightmod: $("#tis_flight_mod").val(),
			brawnmod: $("#tis_brawn_mod").val(),
			gritmod: $("#tis_grit_mod").val(),
			improvementpoints: $("#tis_improvement_points").val(),
			adversitytokens: $("#tis_adversity_tokens").val(),
			improvements: improvements,
			shiproles: shiproles,
			records: records,
			equipment: equipment
		};
		var ms = (new Date()).getTime();
		var timekey = 'tis-character-' + ms;
		var json = JSON.stringify(character);
		localStorage.setItem(timekey, json);
		
		var characters = tis.localstorage.getCharacters();
		characters.push(timekey);
		var json = JSON.stringify(characters);
		localStorage.setItem("tis-characters", json);
	},
	timekeyToDate: function(timekey) {
		var ms = parseInt(timekey.split("-")[2], 10);
		var d = new Date(ms);
		return d;
	},
	deleteCharacter: function(timekey) {
		var characters = tis.localstorage.getCharacters();
		var index = _.indexOf(characters, timekey);
		if (index > -1) {
			characters.splice(index, 1);
		}
		var json = JSON.stringify(characters);
		localStorage.setItem("tis-characters", json);
		localStorage.removeItem(timekey);		
	},
	loadCharacter: function(timekey) {
		var character = tis.localstorage.getCharacter(timekey);
		tis.log(["tis.localstorage.loadCharacter", character]);
		
		$("#tis_name").val(character.name);
		$("#tis_gender").val(character.gender);
		$("#tis_species_name").val(character.species);
		$("#tis_species_drawback").val(character.drawback);
		$("#tis_trope").val(character.trope);
		$("#tis_fatalflaw").val(character.fatalflaw);
		$("#tis_species_description").val(character.speciesdescription);
		$("#tis_credits").val(character.credits);
		$("#tis_fight").val(character.fight);
		$("#tis_brains").val(character.brains);
		$("#tis_charm").val(character.charm);
		$("#tis_flight").val(character.flight);
		$("#tis_brawn").val(character.brawn);
		$("#tis_grit").val(character.grit);
		$("#tis_fight_mod").val(character.fightmod);
		$("#tis_brains_mod").val(character.brainsmod);
		$("#tis_charm_mod").val(character.charmmod);
		$("#tis_flight_mod").val(character.flightmod);
		$("#tis_brawn_mod").val(character.brawnmod);
		$("#tis_grit_mod").val(character.gritmod);
		$("#tis_improvement_points").val(character.improvementpoints);
		$("#tis_adversity_tokens").val(character.adversitytokens);
		
		_.each(character.improvements, function(element, i) {
			var key = (i < 9 ? "0" : "") + (i + 1);
			var improvement = tis.improvements.findByName(element);

			$("#tis_improvements_cost_" + key).val(improvement.IP);
			$("#tis_improvements_name_" + key).html(element);
			$("#tis_improvements_description_" + key).html(improvement.Description);
		});
		
		_.each(character.shiproles, function(element, i) {
			var key = (i < 9 ? "0" : "") + (i + 1);
			$("#tis_ship_roles_" + key).val(element);
		});

		_.each(character.records, function(element, i) {
			var key = (i < 9 ? "0" : "") + (i + 1);
			$("#tis_records_" + key).val(element);
		});		
		
		_.each(character.equipment, function(element, i) {
			var key = (i < 9 ? "0" : "") + (i + 1);
			$("#tis_backpack_" + key).val(element);
		});		
	}
};