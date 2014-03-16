App.PersonsRoute = Ember.Route.extend({
	actions: {
		addPerson: function(count) {
			this.render('newPerson', { into: 'persons', outlet: 'modal', view: 'modal' });
                        this.transitionTo('newPerson')//, newPerson);

		}
	},
	model: function() {
		return this.store.find("person");
	}
});
