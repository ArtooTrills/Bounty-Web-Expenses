App.ExpensesController = Ember.ArrayController.extend({
    payables : {},
    actions : {
        remove : function(expense){
            var self = this;
            var promise = this.store.find('settlement',expense.get('settlementID')).then(function(settlement){
                settlement.deleteRecord();
                settlement.save();
                
                expense.deleteRecord();
                expense.save();
                
                self.transitionTo('expenses');
            });
        }
    }
});