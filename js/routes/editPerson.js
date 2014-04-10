App.EditPersonRoute = Ember.Route.extend({
	renderTemplate: function() {			
		this.render('editPerson', { into: 'persons', outlet: 'modal', view: 'modal' });
	},
	actions: {
		close: function() {
                        this.disconnectOutlet({outlet: 'modal', parentView: 'persons'});
			this.transitionTo('persons');
                },
		 save: function() {
                        var person = this.currentModel;
                        person.save();
                        this.send("close");
                }

	},
	model: function(params) {
		return this.store.find("person", params.person_id);
	}
});
