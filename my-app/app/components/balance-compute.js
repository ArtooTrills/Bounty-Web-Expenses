import Ember from 'ember';

export default Ember.Component.extend({
	users: [],
	expenses: [],
	balances: [],
	actions: {
		computeBalances: function(){
			var balance = {};
			let users = this.get("users");
			for(var i = 0; i< users.length; i++){
				for(var j = 0; j< users.length; j++){
					if(users[i].name !== users[j].name){
						var nameID = users[i].name;
						nameID = nameID + '-';
						nameID = nameID + users[j].name;
						balance[nameID] = 0;
					}
				}
			}
			this.send("computeExpenses", balance);
		},
		computeExpenses: function(balance){
			let expenses = this.get("expenses");
			for(var i = 0; i < expenses.length; i++){
				var to = expenses[i].to_id.split(",");
				var amount = expenses[i].amount / to.length;
				for(var j = 0; j < to.length; j++){
					if(expenses[i].from_id !== to[j]){
						var nameFrom = expenses[i].from_id;
						nameFrom += '-';
						nameFrom += to[j];
						balance[nameFrom] += amount;
					}
				}
			}
			this.send("finalExpenseCalculation", balance);
		},
		finalExpenseCalculation: function(balance){
			var tempBalance = {};
			let users = this.get("users");
			for(var i = 0; i< users.length; i++){
				for(var j = i+1; j< users.length; j++){
					var idFrom = users[i].name + '-' + users[j].name
					var idTo = users[j].name + '-' + users[i].name
					console.log("from and to", idFrom, idTo);
					if(balance[idFrom] > balance[idTo]){
						tempBalance.amount = balance[idFrom] - balance[idTo];
						tempBalance.willGive = users[j].name;
						tempBalance.willGet = users[i].name;
						this.get("balances").pushObject(tempBalance);
					}
					if(balance[idTo] > balance[idFrom]){
						tempBalance.amount = balance[idTo] - balance[idFrom];
						tempBalance.willGive = users[i].name;
						tempBalance.willGet = users[j].name;
						this.get("balances").pushObject(tempBalance);
					}
				}
			}
			console.log("Final balance", this.get("balances"));
		}
	}
});
