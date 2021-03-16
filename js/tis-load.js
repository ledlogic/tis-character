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
		if (timekey) {
			tis.localstorage.loadCharacter(timekey);
			return;
		}

		var f = url.param('f');
		var fn = url.param('fn');
		if (f && fn) {
			tis.filestorage.loadCharacter(f, fn);
			return;
		}
	}
};