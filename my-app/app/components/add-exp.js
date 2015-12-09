import Ember from 'ember';

export default Ember.Component.extend({
    expenses: [],
    users: [],
    balances: [],
    newExpense: false,
    splitUnequally: false,
    success: false,
    actions: {
        addExpense: function () {
            var i = 0;
            var expense = {};
            var unequalList = [];
            var temp = "";
            expense.amount = this.get("amount");
            expense.description = this.get("description");
            var d = new Date();
            expense.date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            let users = this.get("users");
            users.forEach(function (item) {
                if (item.hasPaid) {
                    expense.from_id = item.name;
                }
            });
            if (this.get('splitUnequally')) {
                for (i = 0; i < users.length; i++) {
                    if (users[i].hasReceived) {
                        expense.to_id = users[i].name;
                        expense.amount = users[i].unequalAmount;
                        if (expense.to_id !== expense.from_id) {
                            temp = JSON.stringify(expense);
                            unequalList.pushObject(temp);
                        }
                    }
                }
                this.sendAction('action', unequalList);
            }
            else {
                for (i = 0; i < users.length; i++) {
                    if (users[i].hasReceived) {
                        if (expense.to_id) {
                            expense.to_id = expense.to_id + ",";
                            expense.to_id = expense.to_id + users[i].name;
                        }
                        else {
                            expense.to_id = users[i].name;
                        }
                    }
                }
                temp = JSON.stringify(expense);
                this.sendAction('action', temp);
            }
            this.set('success', true);
            Ember.run.later((function () {
                window.location.reload(true);
            }), 1500);
        },
        addNewExpense: function () {
            this.set("newExpense", true);
        },
        splitUnequal: function () {
            var count = 0;
            let users = this.get("users");
            users.forEach(function (item) {
                if (item.hasReceived) {
                    count = count + 1;
                }
            });
            if (count > 1) {
                this.set("splitUnequally", true);
            }
        },
        cancelExpense: function () {
            this.set("newExpense", false);
            let amount = this.get("amount");
            this.set("amount", "");
            let description = this.get("description");
            this.set("description", "");
            this.send("splitUnequalCancel");
            this.sendAction('reloadModel');
        },
        splitUnequalCancel: function () {
            this.set("splitUnequally", false);
        }
    }
});
