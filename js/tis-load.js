tis.init = function() {
	tis.improvements.init();
	tis.load.init();
};

tis.load = {
	init: function() {
		if (!tis.improvements.ready) {
			setTimeout(tis.load.init, 100);
			return;
		}
		
		$("#tis_list").on("click", function() {
			window.location = "index.html";
		});
		$("#tis_save").on("click", function() {
			tis.localstorage.saveCharacter();
		});
				
		var url = purl();
		var timekey = url.param('timekey');
		tis.localstorage.loadCharacter(timekey);
	}
};