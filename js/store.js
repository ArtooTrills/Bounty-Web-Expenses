

var attr = DS.attr;
App.Friend = DS.Model.extend({
	name: attr('string'),
	screenName: attr('string'),
	description: attr('string')
});

App.Expense = DS.Model.extend({
	date: attr('date'),
	description: attr('string'),
	whoPaid: attr('string'),
	amount: attr('number'),
	forWhom: attr('string')
});