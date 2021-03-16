tis.filestorage = {
	getCharacter: function(f, fn) {
		// get character record
		var character = null;
		$.ajax({
			async: false,
			url: "data/" + f + "/tis-" + fn + ".json",
			success: function(result) {
				character = result;
 			}
		});
		return character;
	},
	saveCharacter: function() {
		// build character object
		var character = tis.character.exportCharacter();
		tis.log(["character", character]);

		// update character record
		var fn = tis.timekey.getTimekey();
		var json = JSON.stringify(character);

    	var contentType = "application/json;charset=utf-8;";
		var a = document.createElement('a');
		a.download = fn + ".json";
		a.href = 'data:' + contentType + ',' + encodeURIComponent(json);
		a.target = '_blank';
		document.body.appendChild(a);
		a.click();

		return character
	},
	loadCharacter: function(f, fn) {
		// import character record
		var character = tis.filestorage.getCharacter(f, fn);
		tis.log(["tis.filestorage.loadCharacter", character]);

		// import character object
		tis.character.importCharacter(character);
	}
};