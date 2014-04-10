App.NewPersonRoute = Ember.Route.extend ({
	actions: {
		close: function() {
                        this.disconnectOutlet({outlet: 'modal', parentView: 'persons'});
			this.transitionTo('persons');
                }
	},

	model: function() {
		return this.store.find('person');
	}

});
