App.ExpensesController = Ember.ArrayController.extend({
	content: [],
	needs: 'persons',
	itemController: 'Expense',
	selectedPayer: '',
	selectedPayees: [],
//	compute the maximum id to generate the next id.
	expensesMaxId: function() {
		var lastRecord = this.get('model.length');
		if (lastRecord == 0)
			return 0;
		return ((this.objectAt(lastRecord - 1)).get('id'));
	}.property('@each'),
	actions: {

		//set the default values for all fields in the form
		setToDefault: function() {	
			this.set('expenseDate', new Date());
			this.set('description', '');
			this.set('selectedPayer', null);
			this.set('amount', '');
			this.set('selectedPayees', []);
		},

		
		close: function() {
			this.send("setToDefault");
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

			var payerName;			
			var self = this; 
			this.store.find('person',payerId).then(function(payer) {
				expense.set('payer', payer);
				expense.save();
				self.send("updateSummaryPayer", payerId, payer.get('name'), payees.length, parseFloat(amount));
			});

			expense.get('payees').then(function(selectedPayees) {	
				payees.forEach(function(payeeId) {
					self.store.find('person', payeeId).then(function(payee) {			
						selectedPayees.addObject(payee);
						expense.set('payees', selectedPayees);
						expense.save();
						self.send("updateSummaryPayees", payeeId, payee.get('name'), payees.length, amount);
					});
				}, payees); 
			});

			this.send("setToDefault");
		},


		save: function(count) {
			this.send("saveChanges", count);
			this.send("close");
		},


		saveAndNew: function(count) {
			this.send("saveChanges", count);
		},	


		//update payer's 'Owed' and 'Balance' values in summary
		updateSummaryPayer: function(payerId, payerName, payeesCount, spentAmount) {
			//calculate the amount that the payer is owed (this is the amount spent)
			var owedAmount = spentAmount.toFixed(2);
			//if payer already present is summary, update the details
			if(this.store.getById('summary', payerId) != null) {
				this.store.find('summary', payerId).then(function(summaryRecord) {
					summaryRecord.set('spent', parseFloat(summaryRecord.get('spent')) + spentAmount);
					summaryRecord.set('owed', parseFloat(summaryRecord.get('owed')) + parseFloat(owedAmount));
				
					summaryRecord.set('balance', (parseFloat(summaryRecord.get('owed')) - parseFloat(summaryRecord.get('owes'))).toFixed(2));
					summaryRecord.save();
				});
			}
	
			//if payer not present in summary, create new record with details
			else {
				this.store.createRecord('summary', {
					id: payerId,
					name: payerName,
					spent: spentAmount,
					owes: 0,
					owed: parseFloat(owedAmount),
					balance: parseFloat(owedAmount)
				});
			}	
		},

		//update payees 'Owes' and 'Balance 'values in summary
		updateSummaryPayees: function(payeeId, payeeName, payeesCount, spentAmount) {
			//calculate the amount that the payee owes for the current expense
			var owesAmount = (parseFloat(spentAmount) / parseFloat(payeesCount)).toFixed(2);
			//if payee already present in summary report, update the details
			if(this.store.getById('summary', payeeId) != null) {
				this.store.find('summary', payeeId).then(function(summaryRecord) {
					summaryRecord.set('owes', parseFloat(summaryRecord.get('owes')) + parseFloat(owesAmount));
					summaryRecord.set('balance', (parseFloat(summaryRecord.get('owed')) - parseFloat(summaryRecord.get('owes'))).toFixed(2));
					summaryRecord.save();
				});
			}

			//if payee not present in summary, add new record with details
			else {
				this.store.createRecord('summary', {
					id: payeeId,
					name: payeeName,
					spent: 0,
					owes: parseFloat(owesAmount),
					owed: 0,
					balance: parseFloat(- owesAmount)
				});
			}
		},
		
		//delete selected records after confirmation and update summary details
		confirmDelete: function() {
		var toDelete = this.filterBy('isChecked', true);
		var self = this;
		toDelete.forEach(function(item) {
				var model = item.get('model');

				//use negative amount value to deduct from summary
			  	self.send("updateSummaryPayer", model.get('payer').get('id'), model.get('payer').get('name'), model.get('payees.length'), parseFloat(- model.get('amount')));

				var payees = model.get('payees');
				payees.forEach(function(payee) {
					self.send("updateSummaryPayees", payee.get('id'), payee.get('name'), model.get('payees.length'), parseFloat(- model.get('amount')));
				});
			
				//delete the expense record		
				model.deleteRecord();
				model.save();
			}, toDelete);
		this.send("close");
		}
	},
});
