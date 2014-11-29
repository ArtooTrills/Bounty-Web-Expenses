import Ember from 'ember';

var PaymentController = Ember.ObjectController.extend({
  needs: ['expenses', 'users'],

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
      var _payments = [];
      var payers = [], payees = [];

      this.get('totals').forEach(function(t) {
        var b = t.balance;
        if(b >= 0) {
          payees.push({user: t.paidBy, bal: b});
        } else {
          payers.push({user: t.paidBy, bal: -b});
        }
      });
      // sort payers asc
      payers.sort(function(u1, u2) { return u1.bal - u2.bal; });
      // sort payees desc
      payees.sort(function(u1, u2) { return u2.bal - u1.bal; });

      payers.forEach(function(payer) {
        if (payer.bal > 0) {
          payees.forEach(function(payee) {
            if (payee.bal > 0) {
              if (payer.bal > payee.bal) {
                _payments.push({payer: payer.user, payee: payee.user, amount: payee.bal});
                payer.bal -= payee.bal;
                payee.bal = 0;
              } else {
                _payments.push({payer: payer.user, payee: payee.user, amount: payer.bal});
                payee.bal -= payer.bal;
                payer.bal = 0;
              }
            }
          });
        }
      });

      // set results for view
      this.set('payments', _payments);
    },

    // compute totals
    totals: function() {
      var totals = [];

      // Fetch all expenses
      var expenses = this.get('model.expenses');

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
        var payer = expense.get('paidBy');
        var payee = expense.get('paidFor');

        var total = _userTotal(payer);
        var payerIncluded = !!expense.get('paidFor').findBy('id', payer.get('id'));

        if (!expense.get('amount')) {
          return;
        }
        var amount = parseFloat(expense.get('amount'));
        total.spent += amount;
        total.expPaid += 1;

        payee.forEach(function(e) {
          var _ut = _userTotal(e);
          if (e.get('id') !== payer.get('id')) {
            _ut.owes += amount/payee.get('length');
          }
          _ut.expIn += 1;
        });

        if (payerIncluded) {
          total.own += amount - (amount/payee.get('length'));
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
