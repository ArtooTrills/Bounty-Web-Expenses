App.PersonsController = Ember.ArrayController.extend({
	content: [],
	itemController: 'Person',
	actions: {
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
