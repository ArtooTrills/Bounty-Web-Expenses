App.ExpensesController = Ember.ArrayController.extend({
	content: [],
	needs: 'persons',
	itemController: 'Expense',
	selectedPayer: '',
	selectedPayees: [],
//	compute the maximum id to generate the next id.
	expensesMaxId: function() {
		var lastRecord = this.get('model.length');
		return ((this.objectAt(lastRecord - 1)).get('id'));
	}.property('@each'),
	actions: {
		close: function() {
			this.set('expenseDate', new Date());
			this.set('description', '');
			this.set('selectedPayer', null);
			this.set('amount', '');
			this.set('selectedPayees', []);
			this.send("closeModal");
		},
		saveChanges: function(count) {
			var date = this.get('expenseDate');
			if(!date) 
				date = new Date();
                        var description = this.get('description');
	                var payerId = this.get('selectedPayer');		
			var amount = this.get('amount');
			var payees = this.get('selectedPayees');
		        var expense = this.store.createRecord('expense', {
				id: parseInt(count) + 1,
                                date: date,
                                description: description,
                                payer: null,
				amount: amount,
				payees: null
                        });
			this.store.find('person',payerId).then(function(payer) {
			expense.set('payer', payer);
			expense.save();
			});
			var self = this; 
			expense.get('payees').then(function(selectedPayees) {	
				payees.forEach(function(payeeId) {
					self.store.find('person', payeeId).then(function(payee) {			
						selectedPayees.addObject(payee);
						expense.set('payees', selectedPayees);
						expense.save();
					});
				}, payees); 
			});
			this.set('expenseDate', new Date());
			this.set('description', '');
			this.set('selectedPayer', null);
			this.set('amount', '');
			this.set('selectedPayees', []);
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
	},
});
