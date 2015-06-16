App.Router.map(function(){
    this.resource("users", { path : '/users' }, function(){
        this.route("add", { path : '/add' });
        this.route("summary", { path : '/:user_id/summary' });
    });
    
    this.resource("expenses", { path : '/expenses' }, function() {
    });
    
    this.route("addexpense", { path : '/addexpense' });
    
    this.route("settlements", { path : '/settlements' });
    
});

App.UsersRoute = Ember.Route.extend({
    model : function() {
        return this.store.find('user');
    }
});

App.AddexpenseRoute = Ember.Route.extend({
    setupController: function(controller) {
        var usersRecord = this.store.find('user');
        controller.set('users', usersRecord);
        controller.set('selectedValue', null);
    }
});

App.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('expenses');
  }
});

