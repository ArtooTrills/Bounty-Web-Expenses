App.Router.map(function(){
	this.resource('friends');
	this.resource('expenses');
	this.resource('summary');
});

App.FriendsRoute = Ember.Route.extend({
	model: function(){
		return this.store.find('friend');
	}
});

App.ExpensesRoute = Ember.Route.extend({
	model: function(){
		return this.store.find('expense');
	}
});

