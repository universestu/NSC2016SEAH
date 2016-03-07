'use strict';

/**
 * Module dependencies.
 */
var config = require('./config/config'),
	mongoose = require('./config/lib/mongoose'),
	express = require('./config/lib/express');
var MicroGear = require('microgear');

// Initialize mongoose
mongoose.connect(function (db) {
	// Initialize express
	var app = express.init(db);

	// Start the app by listening on <port>
	app.listen(config.port);

	// Logging initialization
	console.log('SEAH application started on port ' + config.port);
});
