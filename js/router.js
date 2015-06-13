App.Router.map(function(){
    this.resource("users", { path : '/users' }, function(){
        this.route("add", { path : '/add' });
        this.route("summary", { path : '/:user_id/summary' });
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

App.UsersSummaryRoute = Ember.Route.extend({
    model: function(params) {
        return [{ userID : params.user_id }];
    },
    setupController: function(controller, model) {
        controller.set('userID', model);
        this.setupSummary(controller,model);
    },
    setupSummary: function(controller, model){
        var expensesRecord = this.store.find('expense');
        var usersRecord = this.store.find('user');
        var settlementsRecord = this.store.find('settlement');
        var self = this;
        var isOwed  = [],
            Owes    = [],
            userID = model.get('id'),
            user;

        Em.RSVP.Promise.all([expensesRecord,usersRecord,settlementsRecord]).then(function(results){
           //code that must be executed only after all of the promises in arrayOfPromises is resolved
            console.log('all promises have resolved');

            expensesRecord = results[0];
            usersRecord = results[1];
            settlementsRecord = results[2];

            for (var i=0;i<usersRecord.content.length;i++){
                var userObject = usersRecord.content[i]._data;

                if ( userObject.id == userID ) {
                    user = userObject;
                    break;
                }
            }
            if ( undefined !== user ) {
                var userName = user.name;

                for (var i=0;i<expensesRecord.content.length;i++){
                    var expenseObject = expensesRecord.content[i]._data;
                    // morph expense record to include latest expense item
                    if ( undefined === expenseObject.spendingUser ) {
                        expenseObject = {
                            'id'              : expense.id,
                            'amount'		  : amount,
                            'description'	  : description,
                            'spendingUser'	  : spendingUser,
                            'affectedUsers'   : affectedUsers.toString(),
                            'settlementID'    : settlement.id
                        };
                    } 

                    if (expenseObject.spendingUser === userName) {
                        var settlementID = expenseObject.settlementID;

                        for (var j=0;j<settlementsRecord.content.length;j++){
                            var settlementObject = settlementsRecord.content[j]._data;

                            // morph settlement record to include latest expense item
                            if ( undefined === settlementObject.spendingUser ) {
                                settlementObject = {
                                    'id'                    : settlement.id,
                                    'expenseDescription'    : description,
                                    'settlements'           : settlements,
                                    'spendingUser'          : spendingUser,
                                    'amount'                : amt
                                };
                            }

                            if (settlementObject.id == settlementID) {

                                for (var k=0; k<settlementObject.settlements.length; k++){
                                    var settlementBuffer = settlementObject.settlements[k];

                                    if ( settlementBuffer.settled != true ) {
                                        var o = {
                                            amount  : settlementObject.amount,
                                            who     : userName,
                                            toWhom  : settlementBuffer.user
                                        };
                                        isOwed.push(o);
                                    }
                                }
                            }
                        }

                    } 

                    else {
                        // check if user is part of affected users in expense object
                        if ( undefined !== expenseObject.affectedUsers 
                            && expenseObject.affectedUsers.indexOf(userName) != -1 ) {
                            var settlementID = expenseObject.settlementID;

                            for (var j=0;j<settlementsRecord.content.length;j++){
                                var settlementObject = settlementsRecord.content[j]._data;

                                if (settlementObject.id == settlementID) {

                                    for (var k=0; k<settlementObject.settlements.length; k++){
                                        var settlementBuffer = settlementObject.settlements[k];
                                        // morph settlement record to include latest expense item
                                        if ( undefined === settlementObject.spendingUser ) {
                                            settlementObject = {
                                                'id'                    : settlement.id,
                                                'expenseDescription'    : description,
                                                'settlements'           : settlements,
                                                'spendingUser'          : spendingUser,
                                                'amount'                : amt
                                            };
                                        }
                                        if ( settlementBuffer.user == userName && settlementBuffer.settled != true ) {
                                            var o = {
                                                amount  : settlementObject.amount,
                                                who     : userName,
                                                toWhom  : expenseObject.spendingUser
                                            };
                                            Owes.push(o);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            var ob = {
                userID  : userID,
                owes    : Owes,
                isOwed  : isOwed
            }
            controller.set("summary", ob);

        });
    }
});

App.ExpensesRoute = Ember.Route.extend({
    setupController: function(controller) {
        controller.set('model', this.store.find('expense'));
    }
    
});

App.ExpensesAddRoute = Ember.Route.extend({
    setupController: function(controller) {
        /*controller.set('model',this.store.find('user', params.user_id));*/
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