App.SummaryRoute = Ember.Route.extend({

	model: function() {
		return this.store.find('summary');
	}

});
