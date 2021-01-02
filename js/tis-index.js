tis.init = function() {
	tis.characters = tis.localstorage.getCharacters();
	tis.log(["tis.characters", tis.characters]);

	var html = [];
	if (tis.characters.length) {
		html.push("<table border=\"1\" width=\"100%\"><theader><tr>"
			+ "<th>Load</th>"
			+ "<th>Delete</th>"
		 	+ "<th>Species</th>"
		 	+ "<th>Trope</th>"
		 	+ "<th>Name</th>"
		 	+ "<th>Date</th>"
		 	+ "</tr></theader><tbody>"
		);
	
		_.each(tis.characters, function(timekey) {
			tis.log(["timekey", timekey]);
			var characterItem = localStorage.getItem(timekey);
			if (characterItem) {
				var character = JSON.parse(characterItem);
				tis.log(["character", character]);
			
				html.push("<tr>"
				 	+ "<td align=\"center\">"
				 	+ "<img class=\"tis-index-icon tis-load\" data-timekey=\"" + timekey + "\" src=\"img/bootstrap/person.svg\" alt=\"Load\" title=\"Load\" />"
				 	+ "</td>"
				 	+ "<td align=\"center\">"
				 	+ "<img class=\"tis-index-icon tis-delete\" data-timekey=\"" + timekey + "\" src=\"img/bootstrap/person-dash.svg\" alt=\"Delete\" title=\"Delete\" />"
				 	+ "</td>"
				 	+ "<td>" + character.species + "</td>"
				 	+ "<td>" + character.trope + "</td>"
				 	+ "<td>" + character.name + "</td>"
				 	+ "<td>" + tis.localstorage.timekeyToDate(timekey) + "</td>"
				 	+ "</tr>"
				);
			} else {
				tis.log("Could not find item, timekey[" + timekey + "]");
			}
		});
	
		if (tis.characters.length) {
			html.push("</tbody></table>");
		}	
		$(".tis-saved-characters").html(html.join("\n"));
	}
};