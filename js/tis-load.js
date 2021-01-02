tis.init = function() {
	tis.character.init();
	tis.gender.init();
	tis.names.init();
	tis.improvements.init();

	tis.load.init();
};

tis.load = {
	init: function() {
		if (!tis.improvements.ready) {
			setTimeout(tis.load.init, 100);
			return;
		}
				
		var url = purl();
		var timekey = url.param('timekey');
		tis.localstorage.loadCharacter(timekey);
	}
};