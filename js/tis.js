$(document).ready(function() {
	tis.init();
})

/* TIS App singleton */

var tis = {
	log: function(s) {
		if (typeof (window.console) != "undefined") {
			console.log(s);
		}
	}
};