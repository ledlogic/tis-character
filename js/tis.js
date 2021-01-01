$(document).ready(function() {
	tis.init();
})

/* TIS App singleton */

var tis = {
	log: function(s) {
		if (typeof (window.console) != "undefined") {
			console.log(s);
		}
	},
	init: function() {
		tis.log(".................................");
		tis.log("tis.init");
		tis.age.init();
		tis.credits.init();
		tis.gender.init();
		tis.names.init();
		// stats < species
		tis.stats.init(); 
		// species < tropes
		tis.species.init();
		tis.tropes.init();
		tis.fatalflaws.init();
		tis.improvements.init();
		tis.adversity.init();
		// rarities < equipment
		tis.rarities.init();
		tis.equipment.init();
	}
};