App.Router.map(function(){
    this.resource("users", { path : '/users' }, function(){
        this.resource("user", { path : '/:user_id' }, function(){
            this.route("edit", { path : '/edit' });
        });
        
        this.route("add", { path : '/add' });
    });
    
    this.resource("expenses", { path : '/expenses' });
});

App.UsersRoute = Ember.Route.extend({
    model : function() {
        return this.store.find('user');
    }
});

App.UsersAddRoute = Ember.Route.extend({
	model : function() {
		return this.modelFor('users');
	}
});

App.ExpensesRoute = Ember.Route.extend({
    setupController: function(controller) {
        controller.set('users', this.store.find('user'));
        controller.set('model', this.store.find('expense'));
        controller.set('selectedValue', null);
    }
    
});