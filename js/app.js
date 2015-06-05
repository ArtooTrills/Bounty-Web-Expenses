var App = Ember.Application.create({});

App.Router.map(function(){
    this.resource("Users", { path : '/users' }, function(){
        this.resource("User", { path : '/:user_id' }, function(){
            this.route("EditUser", { path : '/edit' });
        });
        
        this.route("AddUser", { path : '/add' });
    });
    
    this.resource("Expenses", { path : '/expenses' }, function(){
        this.resource("Expense", { path : '/:expense_id' }, function(){
            this.route("EditExpense", { path : '/edit' });
        });
        
        this.route("AddExpense", { path : '/add' });
    });
});

App.UsersRoute = Ember.Route.extend({
    model : function() {
        return this.store.find('user');
    }
});

App.ExpensesRoute = Ember.Route.extend({
    model : function() {
        return this.store.find('expense');
    }
});
