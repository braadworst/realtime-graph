(async function() {
	try {
		const protocol 				= require('http');
		const server  			  = protocol.createServer();
		const router   				= require('lr-server-router')(server);
		const renderer 				= require('lr-server-renderer');
		const road		 				= require('lr-main')('webserver');
		const websocketServer = require('../extensions/websocket/server')(8081);
		const oplog		 				= require('../extensions/mongodbOplog')('mongodb://localhost:27017/local', websocketServer);
		const store 	 				= await require('../extensions/mongodb')('mongodb://localhost:27017/watertables');
		server.listen(8080, function() {
			console.log('Listening on 8080');
		});

		road
			.extension('router', router, true)
			.extension('renderer', renderer, true)
			.extension('store', store)
			.middleware({
				response : require('../middleware/response'),
				body 		 : require('../middleware/body'),
			});

		require('./road')(road);

	} catch (error) {
		console.error(error);
	}

}());
