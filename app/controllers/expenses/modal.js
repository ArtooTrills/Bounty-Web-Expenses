import ModalController from '../modal';

var ExpensesModalController = ModalController.extend({
  users: [],

  // validation for model
  notValid: function() {
    return !this.get('model.description') || this.get('model.amount') === 0 || !this.get('model.date') || !this.get('model.paidBy') || !this.get('model.paidFor') || this.get('model.paidFor.length') < 1;
  }.property('model.description', 'model.date', 'model.amount', 'model.paidBy', 'model.paidFor.[]'),

  // initialization
  init: function() {
    var self = this;
    this.store.findAll('user').then(function(result){
      self.set('users', result.content);
    });
  },

  actions: {
    create: function(){
      var expense = this.store.createRecord('expense',{});
      this.set('model', expense);
    }
  }
});

export default ExpensesModalController;
