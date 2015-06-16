App.Router.map(function(){
    this.resource("users", { path : '/users' }, function(){
        this.route("add", { path : '/add' });
        this.route("summary", { path : '/:user_id/summary' });
    });
    
    this.resource("expenses", { path : '/expenses' }, function() {
        this.route("add", { path : '/add' });
        this.route("settlements", { path : '/settlements' });
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

App.ExpensesRoute = Ember.Route.extend({
    model : function() {
        return this.store.find('expense');
    }
});

App.ExpensesAddRoute = Ember.Route.extend({
    setupController: function(controller) {
        var usersRecord = this.store.find('user');
        controller.set('users', usersRecord);
        controller.set('selectedValue', null);
    }
});

App.ExpensesSettlementsRoute = Ember.Route.extend({
    
    setupController: function(controller) {
        var expensesRecord = this.store.find('expense'); 
        var settlementsRecord = this.store.find('settlement');
        //controller.set('model', expensesRecord);
        
        this.buildCumulativeSettlement(controller, expensesRecord, settlementsRecord);
    },
    buildCumulativeSettlement: function(controller, expensesRecord, settlementsRecord){
        var self = this;
        Em.RSVP.Promise.all([expensesRecord, settlementsRecord]).then(function(results){
            expensesRecord = results[0];
            settlementsRecord = results[1];
            
            var settlements = self.constructSettlements(expensesRecord, settlementsRecord);
            var payables = self.constructCumulativePayables(settlements);
            
            console.log(payables);
            controller.set("payables", payables);
        });
    },
    constructSettlements: function(expensesRecord, settlementsRecord){
        var array = [], len, amt;
        var aff = [];
        
        for (var i=0;i<expensesRecord.content.length;i++){
            var expenseObject = expensesRecord.content[i]._data;
            for (var j=0;j<expenseObject.affectedUsers.length;j++) {
                if (expenseObject.affectedUsers[j].name != expenseObject.spendingUser.name){
                    
                    // check if current affected user has settled his share for this expense
                    var currentAffectedUser = expenseObject.affectedUsers[j];
                    var settlement = this.findItemById(settlementsRecord, expenseObject.settlementID);
                    for (var k=0; k < settlement.settlements.length; k++){
                        var s = settlement.settlements[k];
                        if (s.user == currentAffectedUser.name) {
                            if (s.settled != true) {
                                aff.push(currentAffectedUser);
                            }
                        }
                    }
                }
            }
            len = expenseObject.affectedUsers.length;
            amt = expenseObject.amount;
            amt = Math.round(amt/len);
            var ob = {
                owedby : aff,
                to: expenseObject.spendingUser.name,
                amt: amt
            };
            array.push(ob);
            aff = [];
        }
        
        return array;
    },
    constructCumulativePayables: function(settlements){
        var array2= [];
        for (var i=0;i<settlements.length;i++){
            var x = settlements[i];
            
            for (var j = 0; j < x.owedby.length; j++){
                var y = x.owedby[j];
                
                var amt = this.getAmountOwedToYBySpendingUser(x.to,y.name,settlements);
                
                if (amt < x.amt) {
                    amt = x.amt - amt;
                    
                    var ob = {
                        by: y.name,
                        amt: amt,
                        to: x.to,
                        settled:false
                    };
                    array2.push(ob);
                } 
                
            }
        }
        return array2;
    },
    getAmountOwedToYBySpendingUser: function(xname, yname, array) {
        var amt = 0;
        for (var k=0;k<array.length;k++){
            var arr = array[k];
            // checking is Y is the spending user
            if (arr.to == yname) {
                
                for (var l=0;l<arr.owedby.length;l++){
                    if (arr.owedby[l].name == xname) {
                        amt += arr.amt;
                    }
                }
            }
        }
        return amt;
    },
    
    findItemById: function(findFrom, id){
        for (var i=0;i<findFrom.content.length;i++){
            var findFromObject = findFrom.content[i]._data;
            if (findFromObject.id == id) {
                return findFromObject;
            }
        }
    }
});

App.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('expenses');
  }
});

