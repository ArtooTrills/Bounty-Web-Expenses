App.PersonsRoute = Ember.Route.extend({
	actions: {
		addPerson: function() {
			this.render('newPerson', { into: 'persons', outlet: 'modal', view: 'modal' });

		},
		deletePersons: function() {
			this.render('confirmDelete', { into: 'persons', outlet: 'modal', view: 'modal' });
		},
		
		editPerson: function(person) {
			this.transitionTo('editPerson', person);
		},

		closeModal: function() {
                        this.disconnectOutlet({outlet: 'modal', parentView: 'persons'});
                }
	},
	model: function() {
		return this.store.find("person");
	}
});
