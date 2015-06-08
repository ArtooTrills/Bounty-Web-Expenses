var App = Ember.Application.create({});

App.ApplicationAdapter = DS.FirebaseAdapter.extend({
    firebase: new Firebase('https://artooexpensetracker.firebaseio.com/')
});


App.ApplicationView = Ember.View.extend({
    currentPathDidChange: function() {
        Ember.run.next( this, function() {
            this.$("ul.nav li:has(>a.active)").addClass('active');
            this.$("ul.nav li:not(:has(>a.active))").removeClass('active');
        });
    }.observes('controller.currentPath')
});
