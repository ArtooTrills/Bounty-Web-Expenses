var App = Ember.Application.create({});

App.ApplicationAdapter = DS.FirebaseAdapter.extend({
    firebase: new Firebase('https://artooexpensetracker.firebaseio.com/')
});



