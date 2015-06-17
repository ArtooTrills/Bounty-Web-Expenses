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
        },
        exportExpenses : function(expensesRecord){
            var data = [['Sl. No.','Spending User', 'Amount', 'Affected Users', 'Time', 'Date']];
            var csvRows = [];
            
            for (var i=0;i<expensesRecord.content.length;i++){
                var expenseObject = expensesRecord.content[i]._data;
                var spendingUser = expenseObject.spendingUser.name;
                var amt = expenseObject.amount;
                var temp = [];
                for (var j=0;j<expenseObject.affectedUsers.length;j++) {
                    temp.push(expenseObject.affectedUsers[j].name)
                }
                temp = temp.join("|");
                var time = moment(expenseObject.createdAt).format('hh:mm:ss a');
                var date = moment(expenseObject.createdAt).format('DD/MMM/YYYY');

                data.push([i+1, spendingUser, amt, temp, time, date]);
            }
            
            for(var i=0, l=data.length; i<l; ++i){
                csvRows.push(data[i].join(','));
            }

            var csvString = csvRows.join("%0A");
            var a         = document.createElement('a');
            a.href        = 'data:attachment/csv,' + csvString;
            a.target      = '_blank';
            a.download    = 'expenses-'+new Date()+'.csv';

            document.body.appendChild(a);
            a.click();
        },
        exportSettlements : function(payables){
            var data = [['Sl. No.','Amount', 'By', 'To']];
            var csvRows = [];
            
            for (var i=0;i<payables.length;i++){
                var payableObject = payables[i];
                
                var amt = payableObject.amt;
                var by = payableObject.by;
                var to = payableObject.to;

                data.push([i+1, amt, by, to]);
            }
            for(var i=0, l=data.length; i<l; ++i){
                csvRows.push(data[i].join(','));
            }

            var csvString = csvRows.join("%0A");
            var a         = document.createElement('a');
            a.href        = 'data:attachment/csv,' + csvString;
            a.target      = '_blank';
            a.download    = 'settlements-'+new Date()+'.csv';

            document.body.appendChild(a);
            a.click();
        }
    }
});
