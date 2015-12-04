import Ember from 'ember';

export default Ember.Route.extend({
	model: function(){
		var url = 'http://localhost:5000/api/person'
		return $.get(url);
	},
	actions: {
		storeUser: function(user) {
			$.ajaxSetup({
			  contentType: "application/json"
			})
			$.post('http://localhost:5000/api/person', user);
		},
		addBlnc: function(blnc) {
			blnc.forEach(function(item){
				$.ajaxSetup({
				  contentType: "application/json"
				})
				$.post('http://localhost:5000/api/balance', item);
			});
		}
	}
});
