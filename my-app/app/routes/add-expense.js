import Ember from 'ember';

export default Ember.Route.extend({
	model: function(){
		return Ember.RSVP.hash({
	    	users: $.get('http://localhost:5000/api/person'),
	    	expenses: $.get('http://localhost:5000/api/expense'),
	    	balances: $.get('http://localhost:5000/api/balance')
    });
	},
	actions: {
		storeExpense: function(expense) {
			if(Ember.isArray(expense)){
				expense.forEach(function(item){
					$.ajaxSetup({
					  contentType: "application/json"
					})
					$.post('http://localhost:5000/api/expense', item);
				});
			}
			else{
				$.ajaxSetup({
					  contentType: "application/json"
					})
				$.post('http://localhost:5000/api/expense', expense);
			}
		},
		modelReload: function(){
			this.refresh();
		},
		balanceStore: function(balance){
			var url = 'http://localhost:5000/api/balance';
			url = url + '/';
			url = url + 'index';
			console.log("..................url" , url);
			$.ajaxSetup({
			  	contentType: "application/json"
			})
			$.patch('http://localhost:5000/api/expense', balance);
		}
	}
});
