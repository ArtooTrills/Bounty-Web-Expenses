App.Router.map(function() {
	this.resource('persons', function() {
		this.resource('newPerson', {path: '/new'});
		this.resource('person', { path: '/:person_id/edit' });
	});
	this.resource('expenses');
	this.resource('summary');
});
