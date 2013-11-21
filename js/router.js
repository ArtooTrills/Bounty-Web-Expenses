App.Router.map(function(){
	this.resource('friends');
	this.resource('expenses');
	this.resource('summary');
});

App.FriendRoute = Em.Route.extend({
	model: function(){
		return this.store.find();
	}
});

