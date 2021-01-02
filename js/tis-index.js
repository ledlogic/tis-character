tis.init = function() {
	tis.index.init();
};

tis.index = {
	init: function() {
		$(".tis-saved-characters").html("<p>No saved characters</p>");
		
		tis.characters = tis.localstorage.getCharacters();
		tis.log(["tis.characters", tis.characters]);
	
		var html = [];
		if (tis.characters.length) {
			html.push("<table border=\"1\" width=\"100%\"><thead><tr>"
			 	+ "<th>Character Name</th>"
			 	+ "<th>Species</th>"
			 	+ "<th>Trope</th>"
			 	+ "<th>Date Saved</th>"
				+ "<th data-orderable=\"false\" >Load</th>"
				+ "<th data-orderable=\"false\" >Delete</th>"
			 	+ "</tr></thead><tbody>"
			);
		
			_.each(tis.characters, function(timekey) {
				tis.log(["timekey", timekey]);
				var characterItem = localStorage.getItem(timekey);
				if (characterItem) {
					var character = JSON.parse(characterItem);
					tis.log(["character", character]);

					var date = tis.localstorage.timekeyToDate(timekey);
					var dateStr = date.toLocaleString();
				
					html.push("<tr>"
					 	+ "<td>" + character.name + "</td>"
					 	+ "<td>" + character.species + "</td>"
					 	+ "<td>" + character.trope + "</td>"
					 	+ "<td>" + dateStr + "</td>"
					 	+ "<td align=\"center\">"
					 	+ "<img class=\"tis-index-icon tis-load\" data-sort=\"" + timekey + "\" data-timekey=\"" + timekey + "\" src=\"img/bootstrap/person.svg\" alt=\"Load\" title=\"Load\" />"
					 	+ "</td>"
					 	+ "<td align=\"center\">"
					 	+ "<img class=\"tis-index-icon tis-delete\" data-sort=\"" + timekey + "\" data-timekey=\"" + timekey + "\" src=\"img/bootstrap/person-dash.svg\" alt=\"Delete\" title=\"Delete\" />"
					 	+ "</td>"
					 	+ "</tr>"
					);
				} else {
					tis.log("Could not find item, timekey[" + timekey + "]");
				}
			});
		
			if (tis.characters.length) {
				html.push("</tbody></table>");
			}	
			var h = html.join("\n");
			console.log(h);
			$(".tis-saved-characters").html(h);
			var options = {
				//info: false,
			    //ordering: false,
				paging: false
			};
			$('.tis-saved-characters table').DataTable(options);
			
			$(".tis-load").on("click", function() {
				var timekey = $(this).data("timekey");
				window.location = "tis-load.html?timekey=" + encodeURIComponent(timekey);
			});
	
			$(".tis-delete").on("click", function() {
				var timekey = $(this).data("timekey");
				var character = tis.localstorage.deleteCharacter(timekey);
				
				alert("Deleted " + character.name);
				
				tis.init();
			});
		};
	}
};