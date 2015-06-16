App.ExpensesRoute = Ember.Route.extend({
    model : function() {
        return this.store.find('expense');
    },
    setupController: function(controller, model) {
        this._super(controller, model);
        
        var expensesRecord = this.store.find('expense'); 
        var settlementsRecord = this.store.find('settlement');
        
        
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