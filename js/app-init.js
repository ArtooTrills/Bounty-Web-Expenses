window.App = Ember.Application.create();

App.ApplicationAdapter = DS.FixtureAdapter.extend();
App.Store = DS.Store.extend({
	adapter: 'Application' 
});

