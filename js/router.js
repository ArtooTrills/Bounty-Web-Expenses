App.Router.map(function() {
	this.resource('persons', function() {
		this.resource('editPerson', { path: '/:person_id' });
	});
	this.resource('expenses', function() {
		this.resource('editExpense', { path: '/:expense_id' });
	});
	this.resource('summary');
});
