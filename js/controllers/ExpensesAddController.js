App.ExpensesAddController = Ember.ArrayController.extend({
    
    actions : {
        addExpense : function(){
            var description = this.get('description');
            var amount = this.get('amount');
            var spendingUser = this.get('spendingUser');
            var affectedUsers = this.get('affectedUsers');
            
            var self = this,
                expense, 
                settlement, settlements, amt;
            
            // pull users list to morph expense data before persist
            this.users.then(function(response) {
                var userBuffer = [];
                for (var i=0;i<response.content.length;i++){
                    userBuffer.push(response.content[i]._data);
                }
                delete i;
                // implement convenience method; return name w.r.t. provided ID
                userBuffer.findNameById = function(id){
                    for (var i=0;i<userBuffer.length;i++){
                        if (userBuffer[i].id == id) {
                            return userBuffer[i].name;
                        }
                    }
                    delete i;
                };
                // clean input userID of type <App:Ember121:-J31883GTPML>
                spendingUser = spendingUser.toString().split(":")[2];
                spendingUser = userBuffer.findNameById(spendingUser.substring(0,spendingUser.length-1));

                affectedUsers = affectedUsers.toString().split(",");
                len = affectedUsers.length;
                for(var i=0;i<len;i++) {
                    var x = affectedUsers[i].split(":")[2];
                    x = x.substring(0,x.length-1); 
                    affectedUsers[i] = userBuffer.findNameById(x);
                }
                affectedUsers = affectedUsers.toString();
                // validate not-empty
                if (!amount.trim()&&!description.trim()&&!spendingUser.trim()&&!affectedUsers.trim()){return;}

                expense = self.store.createRecord('expense', {
                    'amount'		  : amount,
                    'description'	  : description,
                    'spendingUser'	  : spendingUser,
                    'affectedUsers'  : affectedUsers
                });
                
                
                // persist
                expense.save();
                
                // build settlement object
                affectedUsers = affectedUsers.split(",");
                len = affectedUsers.length;
                settlements = [];
                for(var i=0;i<len;i++) {
                    if ( affectedUsers[i] !== spendingUser ) {
                        var ob = {
                            user : affectedUsers[i],
                            settled: false
                        };
                        settlements.push(ob);
                    }
                }
                amt = Number(amount);
                amt = Math.ceil(amt/len);
                
                settlement = self.store.createRecord('settlement', {
                    'expenseDescription'    : expense.get('description'),
                    'settlements'           : settlements,
                    'spendingUser'          : spendingUser,
                    'amount'                : amt
                });
                settlement.save();
                expense.set("settlementID", settlement.id);
                expense.save();
                /*// reset fields to empty
                self.set('amount', '');
                self.set('description', '');
                self.set('spendingUser', '');
                self.set('affectedUsers', '');*/
                
            });
            
            
            
            
        }
    }
});
