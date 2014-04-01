//TODO: In edit expenses modal dialog form, all values of the record are pre-populated except the payees checkboxes. Need to pre-populate the model's payees values also in the checkboxes.

App.EditExpenseRoute = Ember.Route.extend({

	amount: 0,
	payer: '',
	payees: [],
	payeesLength: 0,

	//save the original values before editing
	afterModel: function(expense) {
		amount = expense.get('amount');
		payer = expense.get('payer');
		payees = expense.get('payees');
		payeesLength = expense.get('payees.length');
	},
 
	//render the modal dialog form for editing the expense
	renderTemplate: function() {			
		this.render('editExpense', { into: 'expenses', outlet: 'modal', view: 'modal' });
	},

	
	actions: {
		//closes the modal dialog
		close: function() {
			
			this.controllerFor("editExpense").set('selectedPayer', '');

			//Temporary fix for payees checkboxes. They all appear unchecked.
			this.controllerFor("editExpense").set('selectedPayees', []);

                        this.disconnectOutlet({outlet: 'modal', parentView: 'expenses'});
			this.transitionTo('expenses');
                },

		 //commits the modified record
		 //First, delete the summary details associated with the expense and then save the edited expense and update the summary with the modified expense.
		 save: function() {
			var self = this;

			//delete the summary details associated with the expense by simply passing the negative original amount
			this.controllerFor("expenses").send("updateSummaryPayer", payer.get('id'), payer.get('name'), payeesLength, parseFloat(-amount));
			payees.forEach(function(payee) {
				self.controllerFor("expenses").send("updateSummaryPayees", payee.get('id'), payee.get('name'), payeesLength, parseFloat(-amount));
			});


			//Save the modified/edited record
                        var expense = this.currentModel;

			//convert to date type before saving
			var date = new Date(expense.get('date'));
			expense.set('date', date);

			var payerId = this.controllerFor("editExpense").get('selectedPayer');
			var selectPayees = this.controllerFor("editExpense").get('selectedPayees');

			//retrieve the corresponding person record from the selected 'Who paid?' id and save as payer.
			this.store.find('person',payerId).then(function(payer) {
				expense.set('payer', payer);
				expense.save();
				//update the summary's payer with the modified expense
				self.controllerFor("expenses").send("updateSummaryPayer", payerId, payer.get('name'), selectPayees.length, parseFloat(expense.get('amount')));
			});

			//retrieve the corresponding persons record from the checked 'For Whom?' ids and save as payees array.
			Em.RSVP.resolve(expense.get('payees')).then(function(payees) {
				//clear the existing values
				payees.clear();
				selectPayees.forEach(function(payeeId) {
					self.store.find('person', payeeId).then(function(payee) {			
						//add each checked person to payees array and save.
						payees.addObject(payee);
						expense.set('payees', payees);
						expense.save();
						//update the summary's payees with the modified expense details
						self.controllerFor("expenses").send("updateSummaryPayees", payeeId, payee.get('name'), selectPayees.length, parseFloat(expense.get('amount')));
					});
				}, selectPayees); 
			});
				
			//close the modal dialog after saving
                        this.send("close");
                },
	
	},

	model: function(params) {
		return this.store.find("expense", params.expense_id);
	}
});
