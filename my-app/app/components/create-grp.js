import Ember from 'ember';

export default Ember.Component.extend({
	users: [],
	actions: {
		addUser: function(){
			var user = {};
			var blnc = {};
			var balances = [];
			user.name = this.get('name');
			user.phone = this.get('phone');
			user.hasReceived = "";
			user.hasPaid = "";
			this.get('users').pushObject(user);
			var temp = JSON.stringify(user);
			this.sendAction('action', temp);
			this.set('name',"");
			this.set('phone',"");
		}
	}
});
