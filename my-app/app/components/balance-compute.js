import Ember from 'ember';

export default Ember.Component.extend({
	users: [],
	expenses: [],
	balances: [],
	actions:{
		computeBalances: function(){
			let users = this.get("users");
			let expenses = this.get("expenses");
			var balance = {};
			users.forEach(function(item))
		}
	}
});
