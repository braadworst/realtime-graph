module.exports = (next, relay) => {
	const collection = relay.extensions.store.collection('watertable');
	collection.find({}, { limit : 30, sort : 'timestamp' }).toArray((error, records) => {
		if (error) {
			throw new Error(error);
		}
		relay.extensions.renderer.state({ watertable : records });
		next();
	});
}