import Ember from 'ember';

export default Ember.Route.extend({
	model: function(){
		return $.get('http://localhost:5000/api/person');
	},
	actions: {
		storeUser: function(user) {
			$.ajaxSetup({
			  contentType: "application/json"
			})
			$.post('http://localhost:5000/api/person', user);
		}
	}
});
