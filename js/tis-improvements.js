/* TIS Improvements */

tis.improvements = {
	points: 10,
	init: function() {
		tis.log("tis.improvements.init");
		tis.improvements.set();
	},
	set: function(val) {
		if (val) {
			tis.improvements.points = val;
		}
		$("#tis_improvement_points").val(tis.improvements.points);
	}
};