App.Router.map(function() {
	this.resource('persons', function() {
		this.resource('person', { path: '/:person_id/edit' });
	});
	this.resource('expenses');
	this.resource('summary');
});
