App.NewPersonController = Ember.ObjectController.extend({
	personsCount: function() {
		return this.get('model.length');
	}.property('@each'),

	actions: {
		save: function(count) {
			var name = this.get('name');
                        var displayName = this.get('displayName');
                        var comment = this.get('comment');
                        var person = this.store.createRecord('person', {
				id: count + 1,
                                name: name,
                                displayName: displayName,
                                comment: comment
                        });
                        person.save();
			this.set('name', '');
			this.set('displayName', '');
			this.set('comment', '');
			this.send("close");
		},
		close: function() {
			return true;
                }
	}
		
});
