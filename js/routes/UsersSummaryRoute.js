App.UsersSummaryRoute = Ember.Route.extend({
    model: function(params) {
        return [{ userID : params.user_id }];
    },
    setupController: function(controller, model) {
        controller.set('userID', model);
        
        var expensesRecord = this.store.find('expense'); 
        var usersRecord = this.store.find('user');
        var settlementsRecord = this.store.find('settlement');
        
        this.setupSummary(controller, model, expensesRecord, usersRecord, settlementsRecord);
    },
    setupSummary: function(controller, model, expensesRecord, usersRecord, settlementsRecord){
        var self = this;
        var isOwed  = [],
            Owes    = [],
            userID = model.get('id'),
            user = {name:undefined};
        
        if (undefined === userID) {
            userID = model[0].userID;
        }
        
        Em.RSVP.Promise.all([expensesRecord,usersRecord,settlementsRecord]).then(function(results){
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

                    if (expenseObject.spendingUser.name === userName) {
                        var settlementID = expenseObject.settlementID;

                        for (var j=0;j<settlementsRecord.content.length;j++){
                            var settlementObject = settlementsRecord.content[j]._data;

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
                        var affectedUsersBuffer;
                        for (a=0;a<expenseObject.affectedUsers.length;a++){
                            if ( undefined == affectedUsersBuffer ) {
                                affectedUsersBuffer = expenseObject.affectedUsers[a].name;
                            }else {
                                affectedUsersBuffer += expenseObject.affectedUsers[a].name;
                            }
                        }
                        if ( undefined !== expenseObject.affectedUsers 
                            && affectedUsersBuffer.indexOf(userName) != -1 ) {
                            var settlementID = expenseObject.settlementID;

                            for (var j=0;j<settlementsRecord.content.length;j++){
                                var settlementObject = settlementsRecord.content[j]._data;

                                if (settlementObject.id == settlementID) {

                                    for (var k=0; k<settlementObject.settlements.length; k++){
                                        var settlementBuffer = settlementObject.settlements[k];
                                        
                                        if ( settlementBuffer.user == userName && settlementBuffer.settled != true ) {
                                            var o = {
                                                amount  : settlementObject.amount,
                                                who     : userName,
                                                toWhom  : expenseObject.spendingUser.name
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
            
            // nullify objects if empty
            if (Owes.length == 0 && isOwed.length == 0) {
                var emptySummary = true;
            } else {
                var emptySummary = false;
            }
            
            var ob = {
                userName        : user.name,
                owes            : Owes,
                isOwed          : isOwed,
                emptySummary    : emptySummary
            }
            controller.set("summary", ob);

        });
    }
});
