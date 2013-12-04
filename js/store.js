var attr = DS.attr;

App.Friend = DS.Model.extend({
	name: attr('string'),
	screenName: attr('string'),
	description: attr('string')
});

App.Expense = DS.Model.extend({
	date: attr(),
	description: attr('string'),
	whoPaid: attr('string'),
	amount: attr('number'),
	forWhom: attr('string')
});

App.Summary = DS.Model.extend();

// App.Friend.FIXTURES = [
// {
// 	id:1,
// 	name: 'Vijay',
// 	screenName: 'vjrngn',
// 	description: 'Web Dev'
// },
// {
// 	id:2,
// 	name: 'Krishna',
// 	screenName: 'kris',
// 	description: 'Managing Director, 3S'
// }
// ];

// App.Expense.FIXTURES = [
// {
// 	id:1,
// 	date: '03-Dec-2013',
// 	description: 'Lunch',
// 	whoPaid: 'Vijay',
// 	amount: 109,
// 	forWhom: 'Krishna'
// }
// ];