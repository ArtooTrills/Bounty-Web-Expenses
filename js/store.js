var attr = DS.attr;

App.Friend = DS.Model.extend({
	name: DS.hasMany('Expense'),
	screenName: attr('string'),
	description: attr('string')
});

App.Expense = DS.Model.extend({
	date: attr('date'),
	description: attr('string'),
	whoPaid: DS.belongsTo('Friend'),
	amount: attr('number'),
	forWhom: attr('string')
});

App.Summary = DS.Model.extend({});