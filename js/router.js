App.Router.map(function(){
    this.resource("users", { path : '/users' }, function(){
        this.route("add", { path : '/add' });
        this.route("info", { path : '/info' });
    });
    
    this.resource("expenses", { path : '/expenses' }, function() {
        this.route("add", { path : '/add' });
        this.route("settlements", { path : '/settlements/:settlement_id' });
    });
    
});

App.UsersRoute = Ember.Route.extend({
    model : function() {
        return this.store.find('user');
    }
});

App.ExpensesRoute = Ember.Route.extend({
    setupController: function(controller) {
        controller.set('model', this.store.find('expense'));
    }
    
});

App.ExpensesAddRoute = Ember.Route.extend({
    setupController: function(controller) {
        controller.set('users', this.store.find('user'));
        controller.set('selectedValue', null);
    }
    
});

App.ExpensesSettlementsRoute = Ember.Route.extend({
    model: function(params) {
        return this.store.find('settlement', params.settlement_id);
    }
});

App.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('expenses');
  }
});