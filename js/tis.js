$(document).ready(function() {
	tis.init();
})

/* TIS App singleton */

var tis = {
	log : function(s) {
		if (typeof (window.console) != "undefined") {
			console.log(s);
		}
	},
	init : function() {
		console.log("tis.init");
		
		tis.age.init();
		tis.species.init();
		tis.tropes.init();
		tis.stats.init();
	}
};