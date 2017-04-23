const parser = require('body/json');

module.exports = async function(next, relay, request, response) {
	const body = parser(request, response, (error, body) => {
		if (error) {
			throw new Error(error);
		}
		next({ body });
	});
}