module.exports = (next, relay) => {
	const collection = relay.extensions.store.collection('watertable');
	collection.deleteMany((error, result) => {
		if (error) {
			throw new Error(error);
		}
		next();
	});
}