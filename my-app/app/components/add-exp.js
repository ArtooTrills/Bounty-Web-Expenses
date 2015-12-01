import Ember from 'ember';

export default Ember.Component.extend({
	expenses: [],
	users: [],
	newExpense: false,
	actions: {
		addExpense: function(){
			var expense = {};
			expense.amount = this.get("amount");
			expense.description = this.get("description");
			let users = this.get("users");
			users.forEach(function(item){
				if(item.hasPaid){
					expense.from_id = item.name;		
				}
				if(item.hasReceived){
					if(expense.to_id){
						expense.to_id = expense.to_id + ",";
						expense.to_id = expense.to_id + item.name;
					}
					else{
						expense.to_id = item.name;
					}
				}
			});
			this.get("expenses").pushObject(expense);
			var temp = JSON.stringify(expense);
			this.sendAction('action', temp);
		},
		addNewExpense: function(){
			this.set("newExpense", true);
		}
	}
});
