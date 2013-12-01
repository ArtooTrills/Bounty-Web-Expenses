App.FriendView = Ember.View.extend({
	templateName: 'expenses',

	name: function(){
		return this.get('friend').get('name');
	}.property('name')
});