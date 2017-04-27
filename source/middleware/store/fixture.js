const setMinutes = require('date-fns/set_minutes');

module.exports = (single = false) => {
	return (next, relay) => {
		const collection = relay.extensions.store.collection('watertable');
		let records;

		if (single) {
			records = [Object.assign({}, relay.parameters, { timestamp : new Date() })];
		} else {
			records		 = Array(amount).fill().map((element, index) => {
				return { 
					id : 1, 
					level : Math.round(Math.random() * 70 + 10), // Sensor range
					timestamp : setMinutes(new Date(), index)
				};
			});
		}

		collection.insertMany(records, (error, result) => {
			if (error) {
				throw new Error(error);
			}
			next();
		});
	}	
}
