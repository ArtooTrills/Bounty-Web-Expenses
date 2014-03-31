//TODO: In edit expenses modal dialog form, all values of the record are pre-populated except the payees checkboxes. Need to pre-populate the model's payees values also in the checkboxes.

App.EditExpenseRoute = Ember.Route.extend({

	//render the modal dialog form for editing the expense
	renderTemplate: function() {			
		this.render('editExpense', { into: 'expenses', outlet: 'modal', view: 'modal' });
	},

	
	actions: {
		//closes the modal dialog
		close: function() {

			//Temporary fix for payees checkboxes. They all appear unchecked.
			this.controllerFor("editExpense").set('selectedPayees', []);

                        this.disconnectOutlet({outlet: 'modal', parentView: 'expenses'});
			this.transitionTo('expenses');
                },

		 //commits the modified record
		 save: function() {
                        var expense = this.currentModel;

			//convert to date type before saving
			var date = new Date(expense.get('date'));
			expense.set('date', date);

			//retrieve the corresponding person record from the selected 'Who paid?' id and save as payer.
			var payerId = this.controllerFor("editExpense").get('selectedPayer');
			this.store.find('person',payerId).then(function(payer) {
				expense.set('payer', payer);
				expense.save();
			});

			//retrieve the corresponding persons record from the checked 'For Whom?' ids and save as payees array.
			var selectPayees = this.controllerFor("editExpense").get('selectedPayees');
			var self = this;
			Em.RSVP.resolve(expense.get('payees')).then(function(payees) {
				//clear the existing values
				payees.clear();
				selectPayees.forEach(function(payeeId) {
					self.store.find('person', payeeId).then(function(payee) {			
						//add each checked person to payees array and save.
						payees.addObject(payee);
						expense.set('payees', payees);
						expense.save();
					});
				}, selectPayees); 
			});
				
			//close the modal dialog after saving
                        this.send("close");
                }
	},

	model: function(params) {
		return this.store.find("expense", params.expense_id);
	}
});
