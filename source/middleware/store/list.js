module.exports = (next, relay) => {
	const collection = relay.extensions.store.collection('watertable');
	collection.find({}).sort(['timestamp', -1]).limit(30).toArray((error, records) => {
		if (error) {
			throw new Error(error);
		}
		relay.extensions.renderer.state({ watertable : records });
		next();
	});
}