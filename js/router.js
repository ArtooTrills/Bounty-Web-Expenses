App.Router.map(function(){
	this.resource('friends', function(){
		this.resource('delete', { path: '/:friend_id' });
	});
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

App.SummaryRoute = Ember.Route.extend({
	model: function(){
		return this.store.find('expense');
	}
});