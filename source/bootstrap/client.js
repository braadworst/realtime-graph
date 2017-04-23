const renderer 				= require('lr-client-renderer');
const road		 				= require('lr-main')('client', { resetAfterCycle : false });
const websocketClient = require('../extensions/websocket/client')('http://watertables.lan/websocket/');

road
	.extension('renderer', renderer, true)
	.extension('websocketClient', websocketClient, true)
	.middleware({
		'events.home' : require('../middleware/events/home'),
	});

require('./road')(road);
