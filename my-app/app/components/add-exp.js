import Ember from 'ember';

export default Ember.Component.extend({
    expenses: [],
    users: [],
    balances: [],
    showContent: [],
    limit: 10,
    newExpense: false,
    splitUnequally: false,
    success: false,
    expensesInit: function() {
        var i = 0;
        let expenses = this.get("expenses");
        let limit = this.get("limit");
        let showContent = this.get("showContent");
        for(i = (expenses.length) - 1; i >= (expenses.length) - limit; i--){
            if(i >= 0){
                showContent.pushObject(expenses[i]);
            }
        }
    }.on('init'),
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
        },
        addResults: function() {
            var i = 0;
            let expenses = this.get("expenses");
            let limit = this.get("limit");
            limit += 10;
            let showContent = this.get("showContent");
            showContent = [];
            for(i = (expenses.length) - 1; i >= (expenses.length) - limit; i--){
                if(i >= 0){
                    showContent.pushObject(expenses[i]);
                }
            }
            this.set("showContent", showContent);
        },
        export: function() {
            var JSONData = this.get("expenses");
            var arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData;
            var CSV = '';
            if (true) {
                var row = "";
                var headers = ["FROM", "TO", "DESCRIPTION", "AMOUNT", "DATE"];
                for (var i = 0; i < headers.length; i++) {
                    row += headers[i] + ',';
                }
                row = row.slice(0, -1);
                CSV += row + '\r\n';
            }
            for (var i = 0; i < arrData.length; i++) {
                var row = "";
                var headers = ["from_id", "to_id", "description", "amount", "date"];
                for (var j = 0; j < headers.length; j++) {
                    var index = headers[j];
                    var data = arrData[i][index];
                    if(index === "date"){
                        data = arrData[i][index] + '/';
                    }
                    row += '"' + data + '",';
                }
                row.slice(0, row.length - 1);
                CSV += row + '\r\n';
            }
            if (CSV === '') {        
                alert("Invalid data");
                return;
            }   
            var fileName = "Expences";
            var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
            var link = document.createElement("a");    
            link.href = uri;
            link.download = fileName + ".csv";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
});
