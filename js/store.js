App.Store = DS.Store.extend({
	revision: 12,
	adapter: 'DS.FixtureAdapter'
})


App.Friend = DS.Model.extend({
	name: DS.attr('string'),
	screenName: DS.attr('string'),
	description: DS.attr('string'),
});


App.Friend.FIXTURES = [
{
	id: 1,
	name: 'Vijay',
	screenName: 'lonewolf',
	description: 'Web Developer'
},
{
	id: 2,
	name: 'Anand',
	screenName: 'agp',
	description: 'Network Associate, Akamai'
}
];