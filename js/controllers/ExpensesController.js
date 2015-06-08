App.ExpensesController = Ember.ArrayController.extend({
    
    actions : {
        addExpense : function(){
            var description = this.get('description');
            var amount = this.get('amount');
            var spendingUser = this.get('spendingUser');
            var affectedUsers = this.get('affectedUsers');
            
            var self = this;
            // clean input
            this.users.then(function(response) {
                //console.log(response.toString()); //(you can return the models here if all is good)
                var userBuffer = [];
                for (var i=0;i<response.content.length;i++){
                    userBuffer.push(response.content[i]._data);
                }
                delete i;
                userBuffer.findNameById = function(id){
                    for (var i=0;i<userBuffer.length;i++){
                        if (userBuffer[i].id == id) {
                            return userBuffer[i].name;
                        }
                    }
                    delete i;
                };
                
                
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

                if (!amount.trim()&&!description.trim()&&!spendingUser.trim()&&!affectedUsers.trim()){return;}

                var expense = self.store.createRecord('expense', {
                    'amount'		  : amount,
                    'description'	  : description,
                    'spendingUser'	  : spendingUser,
                    'affectedUsers'  : affectedUsers
                });
                console.log("spending_user => "+spendingUser);
                self.set('amount', '');
                self.set('description', '');
                self.set('spendingUser', '');
                self.set('affectedUsers', '');

                expense.save();
            
            });
            
            
        }
    }
});