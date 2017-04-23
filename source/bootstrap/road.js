module.exports = road => {
	road
		.middleware({
			template 				 : require('../middleware/template/default'),
			'store.fixture'	 : require('../middleware/store/fixture')(),
			'store.single'	 : require('../middleware/store/fixture')(1, true),
			'store.empty'		 : require('../middleware/store/empty'),
			'store.list'		 : require('../middleware/store/list'),
			'component.home' : require('../middleware/components/home'),
			'component.done' : require('../middleware/components/done'),
		})
		.where('webserver')
			.run('*', 'template')
			.run('/empty', 'store.empty')
			.run('/empty', 'component.done')
			.run('/single', 'body', 'POST')
			.run('/single', 'store.single', 'POST')
			.run('/fixture', 'store.fixture')
			.run('/fixture', 'component.done')
			.run('/', 'store.list')
		.where('webserver', 'client')
			.run('/', 'component.home')
		.where('client')
			.run('/', 'events.home', 'homeLoaded')
			.run('data', 'events.home', 'websocket')
		.where('webserver')
			.done('response')
			.done('response', 'POST');

}		
