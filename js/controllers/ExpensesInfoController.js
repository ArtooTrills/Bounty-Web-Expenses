App.ExpensesInfoController = Ember.ObjectController.extend({
    settlements : function() {
        var expense = this.get('model')._data;
        var affectedUsers = expense.affectedUsers.split(",");
        var amount = Number(expense.amount);
        var len = affectedUsers.length;
        var dividedAmount = amount/len;
        var toPay = [];
        for (i=0;i<len;i++){
            var ob = {
                user : affectedUsers[i],
                amount : Math.ceil(dividedAmount)
            };
            toPay.push(ob);
        }
        return toPay;
    }.property('model')
});