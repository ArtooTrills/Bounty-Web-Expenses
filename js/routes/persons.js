App.PersonsRoute = Ember.Route.extend({
	actions: {
		addPerson: function(count) {
			this.render('newPerson', { into: 'persons', outlet: 'modal', view: 'modal' });
                        this.transitionTo('newPerson');

		},
		deletePersons: function() {
			this.render('confirmDelete', { into: 'persons', outlet: 'modal', view: 'modal' });
		},
		
		close: function() {
                        this.disconnectOutlet({outlet: 'modal', parentView: 'persons'});
			this.transitionTo('persons');
                }
	},
	model: function() {
		return this.store.find("person");
	}
});
