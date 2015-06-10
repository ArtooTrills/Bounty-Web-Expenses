App.Router.map(function(){
    this.resource("users", { path : '/users' });
    
    this.resource("expenses", { path : '/expenses' }, function() {
        this.route("info", {path : ':expense_id/info'})
    });
});

App.UsersRoute = Ember.Route.extend({
    model : function() {
        return this.store.find('user');
    }
});

App.ExpensesRoute = Ember.Route.extend({
    setupController: function(controller) {
        controller.set('users', this.store.find('user'));
        controller.set('model', this.store.find('expense'));
        controller.set('selectedValue', null);
    }
    
});

App.ExpensesInfoRoute = Ember.Route.extend({
    model: function(params) {
        return this.store.find('expense', params.expense_id);
    }
});

App.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('expenses');
  }
});