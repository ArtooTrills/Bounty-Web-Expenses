import Ember from 'ember';

var ExpenseController = Ember.ObjectController.extend({
  needs:['expenses/modal'],
  isSelected: false,

  // actions
  actions: {
    // remove expense
    remove: function() {
      var expense = this.get('model');
      expense.deleteRecord();
      expense.save();
    },

    // edit expense
    edit: function() {
      this.send('openModal', 'expenses.modal');

      var expense = this.get('model');
      this.get('controllers.expenses/modal').send('edit', expense);
    }
  }
});

export default ExpenseController;
