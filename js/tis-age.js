/* TIS Age */

tis.age = {
	init: function() {
		tis.log("tis.age.init");
		var age = 12 + tis.math.dieN(7);
		tis.age.set(age);
	},
	set: function(age) {
		tis.log(["age", age]);
		$("#tis_age").val(age);
	}
};