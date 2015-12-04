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
			this.get('users').forEach(function(item){
				if(item){
					blnc.from_id = item.name;
					blnc.to_id = user.name;
					blnc.amount = 0;
					var temp = JSON.stringify(blnc);
					balances.pushObject(temp);
					blnc.from_id = user.name;
					blnc.to_id = item.name;
					blnc.amount = 0;
					var temp = JSON.stringify(blnc);
					balances.pushObject(temp);
				}
			});
			this.sendAction('addNewBlnc', balances);
			this.get('users').pushObject(user);
			var temp = JSON.stringify(user);
			this.sendAction('action', temp);
			this.set('name',"");
			this.set('phone',"");
		}
	}
});
