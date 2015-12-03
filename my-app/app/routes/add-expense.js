import Ember from 'ember';

export default Ember.Route.extend({
	model: function(){
		return Ember.RSVP.hash({
	    	users: $.get('http://localhost:5000/api/person'),
	    	expenses: $.get('http://localhost:5000/api/expense')
    });
		// return $.get('http://localhost:5000/api/expense');
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
		}
	}
});
