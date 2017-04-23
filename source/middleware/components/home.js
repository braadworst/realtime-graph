module.exports = (next, relay) => {
	relay.extensions.renderer.render(`
		<section id="home" data-lr="loaded">
			<h1>Realtime distance graph</h1>
			<div class="graph"></div>
		</section>
	`, '.content');
	next();
}