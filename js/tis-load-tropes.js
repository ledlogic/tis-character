tis.init = function() {
	tis.stats.init();
	tis.tropes.init();
};

tis.tropes.response = function(d) {
	tis.log("tis.tropes.response");
	var data = d.data;
	var list = tis.tropes.list;
	for (var i=0; i<data.length; i++) {
		var datum = data[i];
		//tis.log(["datum", datum]);
		list[list.length++] = datum;
	}	
	//tis.log(["list", list]);
	setTimeout(tis.tropes.render, 10);
	$("#publish-new-tropes").on("click", tis.tropes.publish);
};

tis.tropes.render = function() {
	tis.log("tis.tropes.render");
	var h = [];
	h.push("<table>");
	h.push("<thead>");
	h.push("<tr>");
	h.push("<th>Initial row</th>");
	h.push("<th>Trope</th>");
	for (var i=0; i<tis.stats.levels.length; i++) {
		h.push("<th>" + tis.stats.levels[i] + "</th>");
	}
	h.push("</tr>");
	h.push("</thead>");
	
	h.push("<tbody>");
	for (var i=0; i<tis.tropes.list.length; i++) {
		var t = tis.tropes.list[i];
		var n = t.Name;
		var s = t.Stats.split(" ");
		h.push("<tr>");
		h.push("<td>" + (i+1) + "</td>");
		h.push("<td class=\"standard-trope\">" + n + "</td>");
		for (var j=0; j<s.length; j++) {
			h.push("<td>" + s[j] + "</td>");
		}
		h.push("</tr>");
	}
	
	tis.tropes.generate();
	
	for (var i=0; i<tis.newtropes.length; i++) {
		var t = tis.newtropes[i];
		var n = t.Name;
		var s = t.Stats.split(" ");
		h.push("<tr>");
		h.push("<td>" + (tis.tropes.list.length + i+1) + "</td>");
		h.push("<td><input class=\"new-trope-name\" id=\"name-" + i + "\" value=\"\" size=\"14\" data=\"\"/></td>");
		for (var j=0; j<s.length; j++) {
			h.push("<td>" + s[j] + "</td>");
		}
		h.push("</tr>");
	}
	
	h.push("</tbody>");
	h.push("</table>");
	var options = {
		"order": [[ 2, "asc" ],
		          [ 3, "asc" ],
		          [ 4, "asc" ],
		          [ 5, "asc" ],
		          [ 6, "asc" ],
		          [ 7, "asc" ]],
		"paging": false
	};
	$("#tropes-data").html(h.join("")).find("table").DataTable(options);
};

tis.tropes.generate = function() {
	tis.log("tis.tropes.generate");
	var newtropes = [];
	for (var i=0; i<tis.stats.names.length; i++) {
		for (var j=0; j<tis.stats.names.length; j++) {
			if (j!=i) {
				for (var k=0; k<tis.stats.names.length; k++) {
					if (k!=i && k!=j) {
						for (var l=0; l<tis.stats.names.length; l++) {
							if (l!=i && l!=j && l!=k) {
								for (var m=0; m<tis.stats.names.length; m++) {
									if (m!=i && m!=j && m!=k && m!=l) {
										for (var n=0; n<tis.stats.names.length; n++) {
											if (n!=i && n!=j && n!=k && n!=l && n!=m) {
												var stats = tis.stats.names[i]
													      + " " + tis.stats.names[j]
													      + " " + tis.stats.names[k]
													      + " " + tis.stats.names[l]
													      + " " + tis.stats.names[m]
													      + " " + tis.stats.names[n];
												if (!tis.tropes.hasStats(stats)) {
													var t = {
														Name: "",
														Stats: stats
													};
													newtropes.push(t);
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	tis.newtropes = newtropes;
};

tis.tropes.hasStats = function(stats) {
	for (var i=0; i<tis.tropes.list.length; i++) {
		var t = tis.tropes.list[i];
		if (t.Stats == stats) {
			return true;
		}
	}
	return false;
};

tis.tropes.publish = function() {
	tis.log("tis.tropes.publish");
	var newstats = [];
	$(".new-trope-name").each(function f(i) {
		var t = tis.newtropes[i];
		var n = $(this).val();
		if (n) {
			var s = t.Stats;
			newstats.push("\"" + n + "\",\"" + t.Stats + "\"");
		}	
	});
	console.log(newstats.join("\n"));
}