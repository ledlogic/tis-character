/* TIS credits */

tis.credits = {
	amt: 0,
	init: function() {
		tis.log("tis.credits.init");
		tis.credits.set();
	},
	set: function(val) {
		if (val) {
			tis.credits.amt = val;
		}
		$("#tis_credits").val(tis.credits.amt);
	}
};