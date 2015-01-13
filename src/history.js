var hasher = require('hasher'),
	crossroads = require('crossroads');

var handle = function(hash) {
	crossroads.parse(hash);
}

module.exports = {
	start: function() {
		hasher.initialized.add(handle);
		hasher.changed.add(handle);
		hasher.init();
	}
}