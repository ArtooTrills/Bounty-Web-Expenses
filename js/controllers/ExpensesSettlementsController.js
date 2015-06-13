App.ExpensesSettlementsController = Ember.ObjectController.extend({
    actions: {
        save: function(model) {
            var settlements = this.get('model.settlements');
            var self = this;
            var promise = this.store.find('settlement',model.id).then(function(settlement){
                settlement.set('settlements',settlements);
                settlement.save();
                
                // now update user summary object
                var spendingUser = settlement.get('spendingUser');
                
                var usersRecord = self.store.find('user');
                
                usersRecord.then(function(user){
                    if (user.name == spendingUser) {
                        
                    }
                });
            });
        },
        deleteRecord: function() {
            this.get('model').deleteRecord();
            this.get('model').save();
        }
    }
});