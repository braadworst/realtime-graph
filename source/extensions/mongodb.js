const client = require('mongodb').MongoClient;

module.exports = url => {
	return new Promise((resolve, reject) => {
		client.connect(url, (error, database) => {
			if (error) {
				reject(error);
			}
			resolve(database);
		});
	});
}