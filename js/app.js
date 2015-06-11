var App = Ember.Application.create({});

/*App.ApplicationAdapter = DS.FirebaseAdapter.extend({
    firebase: new Firebase('https://artooexpensetracker.firebaseio.com/')
});*/

//App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.ApplicationAdapter = DS.LSAdapter.extend({
    namespace: 'artoo-app'
});

App.ApplicationView = Ember.View.extend({
    currentPathDidChange: function() {
        Ember.run.next( this, function() {
            this.$("ul.nav li:has(>a.active)").addClass('active');
            this.$("ul.nav li:not(:has(>a.active))").removeClass('active');
        });
    }.observes('controller.currentPath')
});

Ember.Handlebars.helper('format-date', function(date){
    return moment(date).fromNow();
});