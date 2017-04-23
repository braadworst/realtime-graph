module.exports = (next, relay) => {
	relay.extensions.renderer.render(`Done biatch`, '.content');
	next();
}