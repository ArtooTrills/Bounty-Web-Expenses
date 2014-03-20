App.PersonsController = Ember.ArrayController.extend({
	content: [],
	itemController: 'Person',
//	compute the maximum id to generate the next id.
	personsMaxId: function() {
		var lastRecord = this.get('model.length');
		return ((this.objectAt(lastRecord - 1)).get('id'));
	}.property('@each'),
	actions: {
		close: function() {
			this.set('name', '');
			this.set('displayName', '');
			this.set('comment', '');
			this.send("closeModal");
		},
		saveChanges: function(count) {
			var name = this.get('name');
                        var displayName = this.get('displayName');
                        var comment = this.get('comment');
                        var person = this.store.createRecord('person', {
				id: parseInt(count) + 1,
                                name: name,
                                displayName: displayName,
                                comment: comment
                        });
                        person.save();
			this.set('name', '');
			this.set('displayName', '');
			this.set('comment', '');
		},
		save: function(count) {
			this.send("saveChanges", count);
			this.send("close");
		},
		saveAndNew: function(count) {
			this.send("saveChanges", count);
		},	
		confirmDelete: function() {
		var toDelete = this.filterBy('isChecked', true);
		toDelete.forEach(function(item) {
				item.get('model').deleteRecord();
				item.get('model').save();
			}, toDelete);
			this.send("close");
		}
	}
});
