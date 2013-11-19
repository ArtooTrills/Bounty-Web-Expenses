App.Router.map(function(){
	this.resource('app', {path: '/'});
	this.resource('people', function(){
		this.route('edit');
	});
	this.resource('expenses');
	this.resource('summary');

});

App.PeopleRoute = Ember.Route.extend({
	model: function(){
		return this.store.find('people');
	}
});

App.ExpensesRoute = Ember.Route.extend({
	model: function(){
		return this.store.find('expenses');
	}
});
