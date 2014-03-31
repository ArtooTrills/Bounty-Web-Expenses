App.ExpensesRoute = Ember.Route.extend({
	actions: {
		addExpense: function() {
			this.render('newExpense', { into: 'expenses', outlet: 'modal', view: 'modal' });

		},
		deleteExpenses: function() {
			this.render('confirmDelete', { into: 'expenses', outlet: 'modal', view: 'modal' });
		},
		
		editExpense: function(expense) {
			this.transitionTo('editExpense', expense);
		},

		closeModal: function() {
                        this.disconnectOutlet({outlet: 'modal', parentView: 'expenses'});
                }
	},
	model: function() {
			return this.store.find("expense");
	},

	setupController: function(controller, model) {
		this._super(controller, model);
		this.controllerFor('persons').set('content', this.store.find('person'));
	}
});
