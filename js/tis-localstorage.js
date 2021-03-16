tis.localstorage = {
	getCharacters: function() {
		// get character list
		var charactersItem = localStorage.getItem('tis-characters');
		tis.log(["charactersItem", charactersItem]);
		var characters = charactersItem ? JSON.parse(charactersItem) : [];
		return characters;
	},
	getCharacter: function(timekey) {
		// get character record
		var json = localStorage.getItem(timekey);
		var character = json ? JSON.parse(json) : null;
		return character;
	},
	saveCharacter: function() {
		// build character object
		var character = tis.character.exportCharacter();
		tis.log(["character", character]);
		
		// update character record
		var timekey = tis.timekey.getTimekey();
		var json = JSON.stringify(character);
		localStorage.setItem(timekey, json);
		
		// update character list
		var characters = tis.localstorage.getCharacters();
		characters.push(timekey);
		var json = JSON.stringify(characters);
		localStorage.setItem("tis-characters", json);
		
		return character;
	},
	deleteCharacter: function(timekey) {
		var character = tis.localstorage.getCharacter(timekey);

		// update character record
		localStorage.removeItem(timekey);
		
		// update character list
		var characters = tis.localstorage.getCharacters();
		var index = _.indexOf(characters, timekey);
		if (index > -1) {
			characters.splice(index, 1)[0];
		}
		var json = JSON.stringify(characters);
		localStorage.setItem("tis-characters", json);
		
		return character;
	},
	loadCharacter: function(timekey) {
		// import character record
		var character = tis.localstorage.getCharacter(timekey);
		tis.log(["tis.localstorage.loadCharacter", character]);
		
		// import character object
		tis.character.importCharacter(character);
	}
};