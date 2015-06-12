App.UsersUserController = Ember.ArrayController.extend({
    summary: function() {
        var self = this;
        self.expenses.then(function(expensesModel) {
            // user whose summary is to be calculated
            
            var isOwed  = [],
                Owes    = [],
                model = self.get('model'),
                userID = model.user,
                userName;
                
            self.users.then(function(users) {
                
                for (var i=0;i<users.content.content.length;i++){
                    var userObject = users.content.content[i]._data;
                    
                    if ( userObject.id == userID ) {
                        userName = userObject.name;
                    }
                }
                
                for (var i=0;i<expensesModel.content.content.length;i++){
                    var expenseObject = expensesModel.content.content[i]._data;

                    if (expenseObject.spendingUser === userName) {
                        var settlementID = expenseObject.settlementID;

                        self.store
                                .find('settlement', settlementID)
                                .then(function(settlement){


                            for (var i=0;i<settlement.settlements;i++){
                                if ( settlement.settlements[i].settled != true ) {
                                    var o = {
                                        amount  : settlement.amount,
                                        user    : settlement.settlements[i].user
                                    };
                                    isOwed.push(o);
                                }
                            }
                            delete i;

                        });
                    } else {
                        // check if user is part of affected users in expense object
                        if ( expenseObject.affectedUsers.indexOf(userName) != -1 ) {
                            var settlementID = expenseObject.settlementID;

                            self.store
                                .find('settlement', settlementID)
                                .then(function(settlement){


                                for (var i=0;i<settlement.settlements;i++){
                                    if ( settlement.settlements[i].user == userName && settlement.settlements[i].settled != true ) {
                                        var o = {
                                            amount  : settlement.amount,
                                            user    : settlement.spendingUser
                                        };
                                        Owes.push(o);
                                    }
                                }
                                delete i;

                            });
                        }
                    }
                }
            
                var ob = {
                    owes    : Owes,
                    isOwed  : isOwed
                }
                return ob;
            });
            
         });
    }.property('expenses')
});
