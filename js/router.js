App.Router.map(function(){
	this.resource('friends',function(){
		this.resource('friend', { path: ':friend_id' });
	});
	this.resource('expenses');
	this.resource('summary');
});

App.FriendsRoute = Ember.Route.extend({
	model: function(){
		return this.store.find('friend');
	},
	serialize: function() {
		return { friend_id: model.get('friends')}
	}
});

App.ExpensesRoute = Ember.Route.extend({
	model: function(){
		return this.store.find('expense');
		return this.store.find('friend');
	}
});


App.SummaryRoute = Ember.Route.extend({
	model: function(){
		return this.store.find('expense');
	}
});

App.FriendRoute = Ember.Route.extend({
	model: function (params) {
		return friends.findBy('id', params.friend_id);
	}
});