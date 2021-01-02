tis.localstorage = {
	getCharacters: function() {
		var charactersItem = localStorage.getItem('tis-characters');
		tis.log(["charactersItem", charactersItem]);
		var characters = charactersItem ? JSON.parse(charactersItem) : [];
		return characters;
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
			// tis_species_description
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
	}
};