//People Model

App.People = DS.Model.extend({
	name: DS.attr('string'),
	scrname: DS.attr('string'),
	description: DS.attr('string')
});

App.People.FIXTURES = [
{
	id: 1,
	name: 'Vijay',
	scrname: 'vjrngn',
	description: 'Web Application Developer'
},
{
	id: 2,
	name: 'Anand Prasad',
	scrname: 'agp',
	description: 'Network Associate - Akamai'
},
{
	id: 3,
	name: 'Vignesh',
	scrname: 'vgm',
	description: 'Designer'
},
{
	id: 4,
	name: 'Krishna Rangan',
	scrname: 'Kitta',
	description: 'CEO, 3S Packaging'
},
{
	id: 5,
	name: 'Geetha Rangan',
	scrname: '',
	description: 'Doctor'
}
];


//Expenses Model

App.Expenses = DS.Model.extend({
	name: DS.attr('string'),
	
	description: DS.attr(),
	amt: DS.attr(),
	whopaid: DS.attr(),
	forwhom: DS.attr()
});

App.Expenses.FIXTURES = [
{
	id:1,
	name: 'Vijay',
	description: 'Lunch',
	amt: 250,
	whopaid: 'Vijay',
	forwhom: 'Krishna & Anand'
},
{
	id:2,
	name: 'Krishna',
	description: 'Lunch',
	amt: 300,
	whopaid: 'Krishna',
	forwhom: 'Vijay & Anand'
}
];
