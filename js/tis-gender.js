/* TIS gender */

tis.gender = {
	init: function() {
		tis.log("tis.gender.init");
		$("#tis_gender").on("change", tis.gender.randomize);
		$("#tis_gender_repeat").on("click", tis.gender.randomize);
	},
	randomize: function() {
		if (!tis.names.ready) {
			setTimeout(tis.gender.randomize, 100);
			return;
		}
	
		var gender = $("#tis_gender").val();
		
		// load random name
		if (gender) {
			var list = tis.names[gender].list;
			var index = tis.math.dieZ(list.length);
			tis.log("tis.gender.randomize, index[" + index + "]");
			var name = list[index].Name;			
			$("#tis_name").val(name);
		}
	}
};