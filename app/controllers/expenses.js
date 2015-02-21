import Ember from 'ember';

var filterBy = Ember.computed.filterBy;
var notEmpty = Ember.computed.notEmpty;
var empty = Ember.computed.empty;

var ExpensesController = Ember.ArrayController.extend({
  needs: ['expenses/modal'],
  itemController: 'expense',

  // Selected expenses list
  selected: filterBy('content', 'isSelected', true),
  // set this flag to `true` if any expense is selected
  anySelected: notEmpty('selected.[]'),
  // set this flag to `true` if no expense is selected
  notSelected: empty('selected.[]'),

  // Toggle all expense selections
  toggleSelections: function(key, value) {
    var expenses = this.get('model');
    if (arguments.length === 1) {
      return expenses.isEvery('isSelected');
    }
    expenses.setEach('isSelected', value);
    return value;
  }.property('content.@each.isSelected'),

  // Actions
  actions: {
    // remove selected expenses
    removeSelected: function() {
      var expenses = this.get('selected');
      expenses.invoke('deleteRecord').invoke('save');
    },
    // create expense
    create: function() {
      this.get('controllers.expenses/modal').send('create');
      this.send('openModal', 'expenses.modal');
    },
  }
});

export default ExpensesController;
