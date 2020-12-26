/* TIS gender */

tis.gender = {
	init: function() {
		tis.log("tis.gender.init");
		$("#tis_gender").on("change", tis.gender.onChange);
		$("#tis_gender_repeat").on("click", tis.gender.onChange);
	},
	onChange: function() {
		var gender = $("#tis_gender").val();
		
		// load random name
		if (gender) {
			var list = tis.names[gender].list;
			var index = tis.math.dieZ(list.length);
			var name = list[index].Name;
			$("#tis_name").val(name);
		}
	}
};