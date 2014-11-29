import Ember from 'ember';

var PaymentController = Ember.ObjectController.extend({
  // payments
  payments: [],
  // totals for all users
  totals: [],

  // actions
  actions: {
    // print payments
    print: function() {
    },

    // export payments
    export: function() {
    },

    //compute payments
    payments: function(){
      var payments = [];
      // set results for view
      this.set('payments', payments);
    },

    // compute totals
    totals: function() {
      var totals = [];

      // Fetch all expenses
      var expenses = this.store.all('expense');

      //
      // Compute totals
      //
      var _totals = {};
      var _userTotal = function(user) {
        var total = _totals[user.get('id')];
        if (!total) {
          total = _totals[user.get('id')] = {
            paidBy: user,
            spent: 0,
            own: 0,
            owes: 0,
            expIn: 0,
            expPaid: 0
          };
        }
        return total;
      };

      // update total object in
      expenses.forEach(function(expense) {
        var total = _userTotal(expense.get('paidBy'));
        if (!expense.get('amount')) {
          return;
        }
        var amount = parseFloat(expense.get('amount'));
        total.spent += amount;
        total.expPaid += 1;
        expense.get('paidFor').forEach(function(e) {
          var _ut = _userTotal(e);
          _ut.owes += amount;
          _ut.expIn += 1;
        });
        if (expense.get('paidFor').contains(expense.get('paidBy'))) {
          total.own += amount - (amount/expense.paidFor.length);
        } else {
          total.own += amount;
        }
      });

      // totals
      for (var k in _totals) {
        _totals[k].balance = _totals[k].own - _totals[k].owes;
        totals.push(_totals[k]);
      }

      // set results for view
      this.set('totals', totals);
    }
  }
});

export default PaymentController;
