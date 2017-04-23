module.exports = (next, relay, request, response) => {
	if (request.method === 'POST') {
		response.setHeader("content-type", "application/json");
		response.end(JSON.stringify(relay.body ? relay.body : {}));
	} else {
		response.end(relay.extensions.renderer.html());
	}
	next();
}