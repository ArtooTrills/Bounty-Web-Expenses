App.Router.map(function() {
	this.resource('persons', function() {
		this.resource('editPerson', { path: '/:person_id' });
	});
	this.resource('expenses');
	this.resource('summary');
});
