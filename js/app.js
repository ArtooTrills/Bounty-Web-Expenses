window.App = Ember.Application.create();

App.ApplicationAdapter = DS.FixtureAdapter.extend();
App.Store = DS.Store.extend({
	adapter: 'Application' 
});


App.CheckBoxComponent = Ember.Component.extend({
	tagName: "input",
	type: "checkbox",
	attributeBindings: ["id", "name", "type", "value", "checked:checked" ],
	click: function() {
		var checkedVals = this.get('checkedVals');
		if (checkedVals == null)
			checkedVals = [];
		checkedVals.addObject(this.$().val());
	},
	checked: function() {
		var checkedVals = this.get('checkedVals');
		if (checkedVals == null)
			return false;
		else 
			return checkedVals.contains(this.get("value")); 
		
	}.property('checkedVals')
});

Em.Handlebars.helper('check-box', App.CheckBoxComponent);

App.RadioButtonComponent = Ember.Component.extend({
	tagName: "input",
	type: "radio",
	attributeBindings: ["id", "name", "type", "value", "checked:checked" ],
	click: function() {
		this.set("selection", this.$().val());
	},
	checked: function() {

		//used in edit expenses to retrieve the model's payer id and select it
		if(!this.get("selection")) {
			var payer = this.get('parentView.targetObject').get('payer');
			//if payer is already set, (in case of editing)
			if(payer)
				this.set("selection", payer.id);
		}

		return this.get("value") === this.get("selection");
	}.property('selection')
});

Em.Handlebars.helper('radio-button', App.RadioButtonComponent);

App.EditExpenseController = Ember.ObjectController.extend({
	needs: 'persons',
	selectedPayer: '',
	selectedPayees: []
});

App.ExpenseController = Ember.ObjectController.extend({
	isChecked : false
});

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

App.PersonController = Ember.ObjectController.extend({
	isChecked : false
});

App.PersonsController = Ember.ArrayController.extend({
	content: [],
	itemController: 'Person',
//	compute the maximum id to generate the next id.
	personsMaxId: function() {
		var lastRecord = this.get('model.length');
                if (lastRecord == 0)
                        return 0;
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

App.SummaryController = Ember.ArrayController.extend({
	content: [],
	itemController: 'summaryItem',
	payments: new Array(),
	isComputing: false,
	actions: {
		exportToExcel: function() {
			var htmltable = document.getElementById('summary');
			var html = htmltable.outerHTML;
			window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));	
		},
		printTable: function() {
			var htmltable = document.getElementById('summary');
			newWin = window.open("");
			newWin.document.writeln("<html><head>");
			newWin.document.writeln('<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" />');
			newWin.document.writeln("<link rel='stylesheet' type='text/css' href='css/style.css'>");
			newWin.document.writeln("</head><body>");
			newWin.document.writeln(htmltable.outerHTML);
			newWin.document.writeln("</body></html>");
			newWin.document.close();
			newWin.focus();
			newWin.print();
			newWin.close();
		},
		computePayments: function() {
			var owes = new Array();
			var owed = new Array();
			var payments = this.get('payments');
			this.get('model').forEach(function(summaryRecord) {
				var balance = parseFloat(summaryRecord.get('balance'));
				if(balance >= 0) {
					owed.push({id: summaryRecord.get('id'), name: summaryRecord.get('name'), bal: balance});
				}
				else {
					owes.push({id: summaryRecord.get('id'), name: summaryRecord.get('name'), bal: parseFloat(-balance)});
				}
			});
			owes.sort(function(a, b) {
				return -b.bal + a.bal;
			});

			owed.sort(function(a, b) {
				return b.bal - a.bal;
			});

			while (owes.filter(function(item) {
				if (item.bal > 0)
					return true;	
				}).length != 0) {
				var count = 0;
				var owesObj = owes[count];
				while (owesObj.bal == 0) 
					owesObj = owes[++ count];
				count = 0;
				var owedObj = owed[count];
				while (owedObj.bal == 0)
					owedObj = owed[++ count];
				var owesAmount = owesObj.bal;
				var owedAmount = owedObj.bal;
				if(owesAmount >= owedAmount) {
					owesObj.bal = owesAmount - owedAmount;
					owedObj.bal = 0;
					payments.push({owesId: owesObj.id, owesName: owesObj.name, owedId: owedObj.id, owedName: owedObj.name, amount: owedAmount});
				}
				else {
					owesObj.bal = 0;
					owedObj.bal = owedAmount - owesAmount;
					payments.push({owesId: owesObj.id, owesName: owesObj.name, owedId: owedObj.id, owedName: owedObj.name, amount: owesAmount});
				}
				if (owed.filter(function(item) {
					if(item.bal > 0)
						return true;
					}).length == 0)
					break;
			}
			this.set('payments', payments);
			this.set('isComputing', true);
		}
	}
});

App.SummaryItemController = Ember.ObjectController.extend({
	balanceColor: (function() {
		if(parseFloat(this.get('balance')) >= 0) 
			return "positive";
		else
			return "negative";
	}).property('balance')
});

Ember.Handlebars.registerBoundHelper('formatDate', function(date, format) {
	return moment(date).format(format);
});

App.Expense = DS.Model.extend({
	date: DS.attr('date'),
	description: DS.attr('string'),
	payer: DS.belongsTo('person'),
	amount: DS.attr('number'),
	payees: DS.hasMany('person', {async: true})
});

App.Expense.FIXTURES = [

  {
     id: 1,
     date: '2013-10-30',
     description: 'pizza',
     payer: 1,
     amount: 400,
     payees: [1, 2, 3, 4]
  },

  {
     id: 2,
     date: '2013-11-14',
     description: 'laundry',
     payer: 2,
     amount: 800,
     payees: [1, 2, 3, 4]
  },

  {
     id: 3,
     date: '2014-01-03',
     description: 'bus travel',
     payer: 3,
     amount: 600,
     payees: [1, 2, 3, 4]
  },

  {
     id: 4,
     date: '2014-03-26',
     description: 'movie',
     payer: 4,
     amount: 1200,
     payees: [1, 2, 3, 4]
  }

];

App.Person = DS.Model.extend({
	name: DS.attr('string'),
	displayName: DS.attr('string'),
	comment: DS.attr('string')
});

App.Person.FIXTURES = [
  {
     id: 1,
     name: 'Archana',
     displayName: 'archugs',
     comment: 'Developer'
  },

  {
     id: 2,
     name: 'Kishore',
     displayName: 'justjkk',
     comment: 'DevOps'
  },

  {
     id: 3,
     name: 'Yuvi',
     displayName: 'panda',
     comment: 'Coder'
  },

  {
     id: 4,
     name: 'Sunny',
     displayName: 'sunny',
     comment: 'Graphic designer'
  }

];

App.Summary = DS.Model.extend({
	name: DS.attr('string'),
	spent: DS.attr('number'),
	owes: DS.attr('number'),
	owed: DS.attr('number'),
	balance: DS.attr('number')
});

App.Summary.FIXTURES = [

  {
     id: 1,
     name: 'Archana',
     spent: 400.00,
     owes: 750.00,
     owed: 400.00,
     balance: -350.00
  },

  {
     id: 2,
     name: 'Kishore',
     spent: 800.00,
     owes: 750.00,
     owed: 800.00,
     balance: 50
  },

  {
     id: 3,
     name: 'Yuvi',
     spent: 600.00,
     owes: 750.00,
     owed: 600.00,
     balance: -150.00
  },

  {
     id: 4,
     name: 'Sunny',
     spent: 1200.00,
     owes: 750.00,
     owed: 1200.00,
     balance: 450.00
  }

 ];

App.Router.map(function() {
	this.resource('persons', function() {
		this.resource('editPerson', { path: '/:person_id' });
	});
	this.resource('expenses', function() {
		this.resource('editExpense', { path: '/:expense_id' });
	});
	this.resource('summary');
});

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
		this.controllerFor('summary').set('content', this.store.find('summary'));
	}
});

App.IndexRoute = Ember.Route.extend({
	beforeModel: function() {
		this.transitionTo('persons');
	}
});

App.PersonsRoute = Ember.Route.extend({
	actions: {
		addPerson: function() {
			this.render('newPerson', { into: 'persons', outlet: 'modal', view: 'modal' });
		},
		deletePersons: function() {
			this.render('confirmDelete', { into: 'persons', outlet: 'modal', view: 'modal' });
		},
		
		editPerson: function(person) {
			this.transitionTo('editPerson', person);
		},

		closeModal: function() {
                        this.disconnectOutlet({outlet: 'modal', parentView: 'persons'});
                }
	},
	model: function() {
		return this.store.find("person");
	}
});

App.SummaryRoute = Ember.Route.extend({

	model: function() {
		return this.store.find('summary');
	}

});

Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1;


  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["confirmDelete"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', escapeExpression=this.escapeExpression;


  data.buffer.push("<div class=\"modal-header\">\n	<button type=\"button\" class=\"close\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "close", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(">&times;</button>\n	<h3>Delete Persons</h3>\n</div>\n<div>\n<form ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "confirmDelete", {hash:{
    'on': ("submit")
  },hashTypes:{'on': "STRING"},hashContexts:{'on': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\n<div class=\"modal-body\">\n	Are you sure you want to delete the selected persons?\n</div>\n<div class=\"modal-footer\">\n	<input type=\"button\" class=\"btn\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "close", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" value=\"Cancel\"/>\n        <input type=\"submit\" class=\"btn btn-primary\" value=\"Confirm Delete\"/>\n</div>\n</form>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["editExpense"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"modal-header\">\n	<button type=\"button\" class=\"close\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "close", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(">&times;</button>\n	<h3>Edit Expense</h3>\n</div>\n<div>\n<form ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{
    'on': ("submit")
  },hashTypes:{'on': "STRING"},hashContexts:{'on': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\n<div class=\"modal-body\">\n	<table class=\"table modaltable\">\n		<tr>\n			<td><label for=\"date\">Date </label></td>\n			<td>");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.DateField", {hash:{
    'dateBinding': ("date"),
    'id': ("date")
  },hashTypes:{'dateBinding': "STRING",'id': "STRING"},hashContexts:{'dateBinding': depth0,'id': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</td>\n		</tr>\n		<tr>\n			<td><label for=\"description\">Description </label></td>\n			<td>");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("description"),
    'id': ("description")
  },hashTypes:{'type': "STRING",'value': "ID",'id': "STRING"},hashContexts:{'type': depth0,'value': depth0,'id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("</td>\n		</tr>\n		<tr>\n			<td><label>Who Paid? </label></td>\n			<td>\n			");
  data.buffer.push(escapeExpression((helper = helpers['radio-component'] || (depth0 && depth0['radio-component']),options={hash:{
    'content': ("controllers.persons.content"),
    'value': ("selectedPayer")
  },hashTypes:{'content': "ID",'value': "ID"},hashContexts:{'content': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "radio-component", options))));
  data.buffer.push("\n			</td>\n		</tr>\n		<tr>\n			<td><label for=\"amount\">Amount </label></td>\n			<td>");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("amount"),
    'id': ("amount")
  },hashTypes:{'type': "STRING",'value': "ID",'id': "STRING"},hashContexts:{'type': depth0,'value': depth0,'id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("</td>\n		</tr>\n		<tr>\n			<td><label>For Whom? </label></td>\n			<td>\n			");
  data.buffer.push(escapeExpression((helper = helpers['checkbox-component'] || (depth0 && depth0['checkbox-component']),options={hash:{
    'content': ("controllers.persons.content"),
    'value': ("selectedPayees")
  },hashTypes:{'content': "ID",'value': "ID"},hashContexts:{'content': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "checkbox-component", options))));
  data.buffer.push("\n			");
  stack1 = helpers._triageMustache.call(depth0, "controllers.persons.content.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n			</td>\n		</tr>	\n	</table>\n</div>\n<div class=\"modal-footer\">\n	<input type=\"button\" class=\"btn\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "close", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" value=\"Cancel\"/>\n        <input type=\"submit\" class=\"btn btn-primary\" value=\"Save\"/>\n</div>\n</form>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["editPerson"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"modal-header\">\n	<button type=\"button\" class=\"close\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "close", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(">&times;</button>\n	<h3>Edit Person</h3>\n</div>\n<div>\n<form ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", {hash:{
    'on': ("submit")
  },hashTypes:{'on': "STRING"},hashContexts:{'on': depth0},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">\n<div class=\"modal-body\">\n	<table class=\"table\">\n		<tr>\n			<td><label for=\"name\">Person Name </label></td>\n			<td>");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("name"),
    'id': ("name")
  },hashTypes:{'type': "STRING",'value': "ID",'id': "STRING"},hashContexts:{'type': depth0,'value': depth0,'id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("</td>\n		</tr>\n		<tr>\n			<td><label for=\"displayName\">Display Name </label></td>\n			<td>");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("displayName"),
    'id': ("displayName")
  },hashTypes:{'type': "STRING",'value': "ID",'id': "STRING"},hashContexts:{'type': depth0,'value': depth0,'id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("</td>\n		</tr>\n		<tr>\n			<td><label for=\"comment\">Comment </label></td>\n			<td>");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("comment"),
    'id': ("comment")
  },hashTypes:{'type': "STRING",'value': "ID",'id': "STRING"},hashContexts:{'type': depth0,'value': depth0,'id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("</td>\n		</tr>\n	</table>\n</div>\n<div class=\"modal-footer\">\n	<input type=\"button\" class=\"btn\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "close", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" value=\"Cancel\"/>\n        <input type=\"submit\" class=\"btn btn-primary\" value=\"Save changes\"/>\n</div>\n</form>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["expenses"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push(" Compute Payments >> ");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n			<tr>\n				<td>");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("checkbox"),
    'checked': ("isChecked")
  },hashTypes:{'type': "STRING",'checked': "ID"},hashContexts:{'type': depth0,'checked': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("</td>\n				<td class=\"edit\"><button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "editExpense", "expense", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push(" class=\"btn btn-primary btn-sm\">Edit</button></td>\n				<td> ");
  data.buffer.push(escapeExpression((helper = helpers.formatDate || (depth0 && depth0.formatDate),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","STRING"],data:data},helper ? helper.call(depth0, "date", "DD-MM-YYYY", options) : helperMissing.call(depth0, "formatDate", "date", "DD-MM-YYYY", options))));
  data.buffer.push(" </td>\n				<td> ");
  stack1 = helpers._triageMustache.call(depth0, "description", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </td>\n				<td> ");
  stack1 = helpers._triageMustache.call(depth0, "payer.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </td>\n				<td> ");
  stack1 = helpers._triageMustache.call(depth0, "amount", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </td>\n				<td>\n				<ul class='payees'>\n				");
  stack1 = helpers.each.call(depth0, "person", "in", "payees", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n				</ul>\n				</td>\n			</tr>\n			");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n					<li>");
  stack1 = helpers._triageMustache.call(depth0, "person.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n				");
  return buffer;
  }

  data.buffer.push("<div class=\"main\">\n	<div>\n		<button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addExpense", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" class=\"btn btn-primary btn-xs\">Add Expense [+]</button>\n		<button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteExpenses", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" class=\"btn btn-primary btn-xs\">Delete Selected</button>\n		");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-primary btn-xs")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "summary", options) : helperMissing.call(depth0, "link-to", "summary", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n		<br/><br/>\n		<table class=\"table table-hover table-bordered\">\n			<tr>\n				<th>all</th>\n				<th></th>\n				<th>Date</th>\n				<th>Description</th>\n				<th>Who paid?</th>\n				<th>Amount</th>\n				<th>For whom?</th>\n			</tr>\n			");
  stack1 = helpers.each.call(depth0, "expense", "in", "controller", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n		</table>\n	</div>\n	");
  data.buffer.push(escapeExpression((helper = helpers.outlet || (depth0 && depth0.outlet),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "modal", options) : helperMissing.call(depth0, "outlet", "modal", options))));
  data.buffer.push("\n</div>\n\n\n");
  return buffer;
  
});

Ember.TEMPLATES["modal"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1;


  data.buffer.push("<div class=\"modal-backdrop fade\">&nbsp;</div>\n<div class=\"modal fade show\">\n<div class=\"modal-dialog\">\n<div class=\"modal-content\">\n");
  stack1 = helpers._triageMustache.call(depth0, "yield", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>\n</div>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["newExpense"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"modal-header\">\n	<button type=\"button\" class=\"close\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "close", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(">&times;</button>\n	<h3>New Expense</h3>\n</div>\n<div>\n<form ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", "expensesMaxId", {hash:{
    'on': ("submit")
  },hashTypes:{'on': "STRING"},hashContexts:{'on': depth0},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n<div class=\"modal-body\">\n	<table class=\"table modaltable\">\n		<tr>\n			<td><label for=\"date\">Date </label></td>\n			<td>");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.DateField", {hash:{
    'dateBinding': ("expenseDate"),
    'id': ("date")
  },hashTypes:{'dateBinding': "STRING",'id': "STRING"},hashContexts:{'dateBinding': depth0,'id': depth0},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("</td>\n		</tr>\n		<tr>\n			<td><label for=\"description\">Description </label></td>\n			<td>");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("description"),
    'id': ("description")
  },hashTypes:{'type': "STRING",'value': "ID",'id': "STRING"},hashContexts:{'type': depth0,'value': depth0,'id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("</td>\n		</tr>\n		<tr>\n			<td><label>Who Paid? </label></td>\n			<td>\n			");
  data.buffer.push(escapeExpression((helper = helpers['radio-component'] || (depth0 && depth0['radio-component']),options={hash:{
    'content': ("controllers.persons.content"),
    'value': ("selectedPayer")
  },hashTypes:{'content': "ID",'value': "ID"},hashContexts:{'content': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "radio-component", options))));
  data.buffer.push("\n			</td>\n		</tr>\n		<tr>\n			<td><label for=\"amount\">Amount </label></td>\n			<td>");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("amount"),
    'id': ("amount")
  },hashTypes:{'type': "STRING",'value': "ID",'id': "STRING"},hashContexts:{'type': depth0,'value': depth0,'id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("</td>\n		</tr>\n		<tr>\n			<td><label>For Whom? </label></td>\n			<td>\n			");
  data.buffer.push(escapeExpression((helper = helpers['checkbox-component'] || (depth0 && depth0['checkbox-component']),options={hash:{
    'content': ("controllers.persons.content"),
    'value': ("selectedPayees")
  },hashTypes:{'content': "ID",'value': "ID"},hashContexts:{'content': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "checkbox-component", options))));
  data.buffer.push("\n			");
  stack1 = helpers._triageMustache.call(depth0, "controllers.persons.content.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n			</td>\n		</tr>	\n	</table>\n</div>\n<div class=\"modal-footer\">\n	<input type=\"button\" class=\"btn\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "saveAndNew", "personsMaxId", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(" value=\"Save and New\"/>\n        <input type=\"submit\" class=\"btn btn-primary\" value=\"Save\"/>\n	<input type=\"button\" class=\"btn\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "close", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" value=\"Cancel\"/>\n</div>\n</form>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["newPerson"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  data.buffer.push("<div class=\"modal-header\">\n	<button type=\"button\" class=\"close\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "close", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(">&times;</button>\n	<h3>New Person</h3>\n</div>\n<div>\n<form ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", "personsMaxId", {hash:{
    'on': ("submit")
  },hashTypes:{'on': "STRING"},hashContexts:{'on': depth0},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n<div class=\"modal-body\">\n	<table class=\"table\">\n		<tr>\n			<td><label for=\"name\">Person Name </label></td>\n			<td>");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("name"),
    'id': ("name")
  },hashTypes:{'type': "STRING",'value': "ID",'id': "STRING"},hashContexts:{'type': depth0,'value': depth0,'id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("</td>\n		</tr>\n		<tr>\n			<td><label for=\"displayName\">Display Name </label></td>\n			<td>");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("displayName"),
    'id': ("displayName")
  },hashTypes:{'type': "STRING",'value': "ID",'id': "STRING"},hashContexts:{'type': depth0,'value': depth0,'id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("</td>\n		</tr>\n		<tr>\n			<td><label for=\"comment\">Comment </label></td>\n			<td>");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'value': ("comment"),
    'id': ("comment")
  },hashTypes:{'type': "STRING",'value': "ID",'id': "STRING"},hashContexts:{'type': depth0,'value': depth0,'id': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("</td>\n		</tr>\n	</table>\n</div>\n<div class=\"modal-footer\">\n	<input type=\"button\" class=\"btn\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "saveAndNew", "personsMaxId", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(" value=\"Save and New\"/>\n        <input type=\"submit\" class=\"btn btn-primary\" value=\"Save\"/>\n	<input type=\"button\" class=\"btn\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "close", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(" value=\"Cancel\"/>\n</div>\n</form>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["persons"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push(" Enter Expenses >> ");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n			<tr>\n				<td>");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("checkbox"),
    'checked': ("isChecked")
  },hashTypes:{'type': "STRING",'checked': "ID"},hashContexts:{'type': depth0,'checked': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("</td>\n				<td class=\"edit\"><button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "editPerson", "person", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
  data.buffer.push(" class=\"btn btn-primary btn-sm\">Edit</button></td>\n				<td> ");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </td>\n				<td> ");
  stack1 = helpers._triageMustache.call(depth0, "displayName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </td>\n				<td> ");
  stack1 = helpers._triageMustache.call(depth0, "comment", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </td>\n			</tr>\n			");
  return buffer;
  }

  data.buffer.push("<div class=\"main\">\n	<div>\n		<button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "addPerson", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" class=\"btn btn-primary btn-xs\">Add Person [+]</button>\n		<button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "deletePersons", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" class=\"btn btn-primary btn-xs\">Delete Selected</button>\n		");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("btn btn-primary btn-xs")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "expenses", options) : helperMissing.call(depth0, "link-to", "expenses", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n		<br/><br/>\n		<table class=\"table table-hover table-bordered\">\n			<tr>\n				<th>all</th>\n				<th></th>\n				<th>Person Name</th>\n				<th>Display Name</th>\n				<th>Description or Comment</th>\n			</tr>\n			");
  stack1 = helpers.each.call(depth0, "person", "in", "controller", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n		</table>\n	</div>\n	");
  data.buffer.push(escapeExpression((helper = helpers.outlet || (depth0 && depth0.outlet),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "modal", options) : helperMissing.call(depth0, "outlet", "modal", options))));
  data.buffer.push("\n</div>\n\n\n");
  return buffer;
  
});

Ember.TEMPLATES["summary"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n		<tr>\n			<td> ");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </td>\n			<td> ");
  stack1 = helpers._triageMustache.call(depth0, "spent", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </td>\n			<td> ");
  stack1 = helpers._triageMustache.call(depth0, "owes", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </td>\n			<td> ");
  stack1 = helpers._triageMustache.call(depth0, "owed", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </td>\n			<td ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'class': ("balanceColor")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
  data.buffer.push("> ");
  stack1 = helpers._triageMustache.call(depth0, "balance", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" </td>\n		</tr>\n		");
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n		It would take ");
  stack1 = helpers._triageMustache.call(depth0, "payments.length", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" payments to even out all debts:\n		<br/>\n		<table id=\"payments\">\n		");
  stack1 = helpers.each.call(depth0, "payment", "in", "payments", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n	");
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = '', stack1;
  data.buffer.push("\n		<tr>\n			<td class=\"negative\">");
  stack1 = helpers._triageMustache.call(depth0, "payment.owesName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n			<td>\n				<div class=\"arrow\">\n				<span class=\"line\"></span>\n				<span class=\"point\"></span>\n				</div>\n			</td>\n			<td>");
  stack1 = helpers._triageMustache.call(depth0, "payment.amount", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n			<td>\n				<div class=\"arrow\">\n				<span class=\"line\"></span>\n				<span class=\"point\"></span>\n				</div>\n			</td>\n			<td class=\"positive\">");
  stack1 = helpers._triageMustache.call(depth0, "payment.owedName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n		</tr>\n		");
  return buffer;
  }

function program6(depth0,data) {
  
  
  data.buffer.push("\n			<li> No payments to be done... </li>\n		");
  }

  data.buffer.push("<div class=\"main\">\n	<button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "exportToExcel", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" class=\"btn btn-primary btn-xs\">Export to Excel</button>\n	<button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "printTable", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" class=\"btn btn-primary btn-xs\">Print Table</button>\n	<br/><br/>\n	<table class=\"table table-hover table-bordered\" id=\"summary\">\n		<tr>\n			<th>Name</th>\n			<th>Total Spent</th>\n			<th>Owes</th>\n			<th>Is Owed</th>\n			<th>Balance</th>\n		</tr>\n		");
  stack1 = helpers.each.call(depth0, "summaryItem", "in", "controller", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n	</table>\n	<br/>\n	<button ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "computePayments", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push(" class=\"btn btn-primary btn-xs\">Compute Payments</button>\n	<br/><br/>\n	");
  stack1 = helpers['if'].call(depth0, "isComputing", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>\n\n\n");
  return buffer;
  
});

Ember.TEMPLATES["components/checkbox-component"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n<li>\n	");
  data.buffer.push(escapeExpression((helper = helpers['check-box'] || (depth0 && depth0['check-box']),options={hash:{
    'value': ("id"),
    'name': ("view.name"),
    'checkedVals': ("view.value")
  },hashTypes:{'value': "ID",'name': "ID",'checkedVals': "ID"},hashContexts:{'value': depth0,'name': depth0,'checkedVals': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "check-box", options))));
  data.buffer.push("\n	<label>");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</label>\n</li>\n");
  return buffer;
  }

  data.buffer.push("<ul>\n");
  stack1 = helpers.each.call(depth0, "content", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</ul>\n\n");
  return buffer;
  
});

Ember.TEMPLATES["components/radio-component"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n<li>\n	");
  data.buffer.push(escapeExpression((helper = helpers['radio-button'] || (depth0 && depth0['radio-button']),options={hash:{
    'value': ("id"),
    'name': ("view.name"),
    'selection': ("view.value")
  },hashTypes:{'value': "ID",'name': "ID",'selection': "ID"},hashContexts:{'value': depth0,'name': depth0,'selection': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "radio-button", options))));
  data.buffer.push("\n	<label>");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</label>\n</li>\n");
  return buffer;
  }

  data.buffer.push("<ul>\n");
  stack1 = helpers.each.call(depth0, "content", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</ul>\n\n");
  return buffer;
  
});
App.DateField = Ember.TextField.extend({
	type: 'date',

	date: function(key, date) {
	    if (date) {
	      if (typeof date === "string")
		date = new Date(date);
	      this.set('value', date.toISOString().substring(0, 10));
	    } else {
	      value = this.get('value');
	      if (value) { 
		date = new Date(value);
	      } else {
		date = new Date();
	      	this.set('value', date.toISOString().substring(0, 10));
	      }
	    }
	    return date;
	}.property('value')
});

App.ModalView = Ember.View.extend({
	didInsertElement: function() {
		Ember.run.next(this, function()	{
			this.$('.modal, .modal-backdrop').addClass('in');
		});
	},
	layoutName: 'modal',
	actions: {
		close: function() {
			var view = this;
			this.$('.modal, .modal-backdrop').one("transitioned", function(ev) {
				view.controller.send('close');
			});
			this.$('.modal, .modal-backdrop').removeClass('in');
		}
	}
});
