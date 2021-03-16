tis.timekey = {
	getTimekey: function() {
		// returns character timekey
		var ms = (new Date()).getTime();
		var timekey = 'tis-character-' + ms;
		return timekey;
	},
	timekeyToDate: function(timekey) {
		// translate timekey to javascript date object
		var ms = parseInt(timekey.split("-")[2], 10);
		var d = new Date(ms);
		return d;
	}
}