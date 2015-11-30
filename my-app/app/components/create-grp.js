import Ember from 'ember';

export default Ember.Component.extend({
	users: [{name: "Prateek", phone: "999999"},{name: "Srabani", phone: "3423423"}],
	// users = [];
	actions: {
		addUser: function(){
			let name = this.get('name');
			let phone = this.get('phone');
			var user = {};
			user.name = name;
			user.phone = phone;
			this.get('users').pushObject(user)
		}
	}
});
