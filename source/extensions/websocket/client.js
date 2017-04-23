module.exports = url => {
	return update => {
		// Create WebSocket connection.
		const server = new WebSocket('ws://watertables.lan/websockets/');

		// Listen for messages
		server.addEventListener('message', event => {
			const data = JSON.parse(event.data);
			update({ matchValue : data.matchValue, updateType : data.updateType}, data.body);
		});	
	}
}