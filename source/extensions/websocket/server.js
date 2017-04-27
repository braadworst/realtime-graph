module.exports = port => {
	const WebSocket = require('ws');
	const server 		= new WebSocket.Server({
	  perMessageDeflate: false,
	  port
	});	

	return {
		broadcast(matchValue, body, updateType = 'websocket') {
			if (!matchValue) {
				throw new Error('Trying to broadcast, but no matchValue');
			}
			if (!body) {
				throw new Error('Trying to broadcast, but no body')
			}
			console.log(matchValue, body, updateType);
		  server.clients.forEach(client => {
		  	const data = { matchValue, updateType, body };
		    if (client.readyState === WebSocket.OPEN && client !== server) {
		      client.send(JSON.stringify(data));
		    }
		  });			
		}
	}
}