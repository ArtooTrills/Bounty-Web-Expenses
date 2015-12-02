import Ember from 'ember';

export default Ember.Component.extend({
	expenses: [],
	users: [],
	newExpense: false,
	splitUnequally: false,
	actions: {
		addExpense: function(){
			var expense = {};
			var unequalList = [];
			expense.amount = this.get("amount");
			expense.description = this.get("description");
			let users = this.get("users");
			let expenses = this.get("expenses");
			if(this.get('splitUnequally')){
				users.forEach(function(item){
					if(item.hasPaid){
						expense.from_id = item.name;		
					}
					if(item.hasReceived){
						expense.to_id = item.name;
						expense.amount = item.unequalAmount;
						console.log("enequal amount", expense.to_id, expense.amount, expense);
						expenses.pushObject(expense);
						var temp = JSON.stringify(expense);
						unequalList.pushObject(temp);
					}
				});
				this.sendAction('action', unequalList);
			}
			else{
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
				expenses.pushObject(expense);
				var temp = JSON.stringify(expense);
				this.sendAction('action', temp);
			}
		},
		addNewExpense: function(){
			this.set("newExpense", true);
		},
		splitUnequal: function(){
			this.set("splitUnequally", true);
		}
	}
});
