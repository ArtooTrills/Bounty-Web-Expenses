import Ember from 'ember';

export default Ember.Component.extend({
	expenses: [],
	users: [],
	newExpense: false,
	splitUnequally: false,
	success: false,
	actions: {
		addExpense: function(){
			var expense = {};
			var unequalList = [];
			expense.amount = this.get("amount");
			expense.description = this.get("description");
			let users = this.get("users");
			users.forEach(function(item){
				if(item.hasPaid){
					expense.from_id = item.name;
				}		
			});
			if(this.get('splitUnequally')){
				users.forEach(function(item){
					if(item.hasReceived){
						expense.to_id = item.name;
						expense.amount = item.unequalAmount;
						if(expense.to_id != expense.from_id){
							var temp = JSON.stringify(expense);
							unequalList.pushObject(temp);
						}
					}
				});
				this.sendAction('action', unequalList);
			}
			else{
				users.forEach(function(item){
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
				var temp = JSON.stringify(expense);
				this.sendAction('action', temp);
			}
			this.set('success',true);
			Ember.run.later((function() {
			window.location.reload(true);
			}), 2000);
		},
		addNewExpense: function(){
			this.set("newExpense", true);
		},
		splitUnequal: function(){
			var count = 0;
			let users = this.get("users");
			users.forEach(function(item){
				if(item.hasReceived){
					count = count + 1;
				}
			});
			if(count>1){
				this.set("splitUnequally", true);
			}
		},
		cancelExpense: function(){
			this.set("newExpense", false);
			let amount = this.get("amount");
			this.set("amount", "");
			let description = this.get("description");
			this.set("description", "");
			this.set("splitUnequally", false);
			this.sendAction('reloadModel');
		},
		splitUnequalCancel: function(){
			this.set("splitUnequally", false);
		}
	}
});
