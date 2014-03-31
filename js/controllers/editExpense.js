App.EditExpenseController = Ember.ObjectController.extend({
	needs: 'persons',
	selectedPayer: '',
	selectedPayees: []
});
