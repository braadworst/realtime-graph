module.exports = (url, server) => {
	const oplog  = require('mongo-oplog');
	const logger = oplog(url);

	logger.tail();

	logger.on('insert', record => {
		server.broadcast('data', record.o, 'websocket');
	});
}