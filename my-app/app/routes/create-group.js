import Ember from 'ember';

export default Ember.Route.extend({
	model: function(){
		return $.get('http://localhost:5000/api/person');
	}
});
