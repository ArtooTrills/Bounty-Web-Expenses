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
    },
    export : function(expensesRecord){
        var data = [['Sl. No.','Spending User', 'Amount', 'Affected Users', 'Time']];
        for (var i=0;i<expensesRecord.content.length;i++){
            var expenseObject = expensesRecord.content[i]._data;
            var spendingUser = expenseObject.spendingUser.name;
            var amt = expenseObject.amount;
            var temp = [];
            for (var j=0;j<expenseObject.affectedUsers.length;j++) {
                temp.push(expenseObject.affectedUsers[j].name)
            }
            temp = temp.toString();
            var time = expenseObject.createdAt;
            
            data.push([i+1, spendingUser, amt, temp, time]);
            
            
            var csvRows = [];

            for(var i=0, l=data.length; i<l; ++i){
                csvRows.push(data[i].join(','));
            }

            var csvString = csvRows.join("%0A");
            var a         = document.createElement('a');
            a.href        = 'data:attachment/csv,' + csvString;
            a.target      = '_blank';
            a.download    = 'myFile.csv';
            
            document.body.appendChild(a);
            a.click();
        }
    }
});
