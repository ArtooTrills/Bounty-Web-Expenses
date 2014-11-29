import DS from 'ember-data';

var attr = DS.attr,
    hasMany = DS.hasMany,
    belongsTo = DS.belongsTo;

var Expense = DS.Model.extend({
  description: attr('string'),
  date: attr('string', {
    defaultValue: function() {
      var now = new Date();
      return now.getDate() + '-' + now.getMonth() + '-' + now.getFullYear();
    }
  }),
  amount: attr('number', {
    defaultValue: 0
  }),
  paidBy: belongsTo('user', { async: true }),
  paidFor: hasMany('user', { async: true })
});

// Fixtures data
Expense.reopenClass({
  FIXTURES: [
    {id: 1, description: 'Lunch', amount: 1300, paidBy: 1, paidFor: [1, 3] },
    {id: 2, description: 'Dinner', amount: 1230, paidBy: 2, paidFor: [1, 2, 3] },
    {id: 3, description: 'Movie', amount: 990, paidBy: 3, paidFor: [1, 2, 3] },
    {id: 4, description: 'Meth', amount: 100, paidBy: 4, paidFor: [4] },
  ]
});

export default Expense;
