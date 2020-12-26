/* TIS Adversity */

tis.adversity = {
	tokens: 2,
	init: function() {
		tis.log("tis.adversity.init");
		tis.adversity.set();
	},
	set: function(val) {
		if (val) {
			tis.adversity.tokens = val;
		}
		$("#tis_adversity_tokens").val(tis.adversity.tokens);
	}
};