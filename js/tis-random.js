tis.init = function() {
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
	tis.qualities.init();
	tis.equipment.init();
	
	tis.random.init();
};

tis.random = {
	init: function() {
		$("#tis_list").on("click", function() {
			window.location = "index.html";
		});
		$("#tis_save").on("click", function() {
			tis.localstorage.saveCharacter();
		});
	}
};