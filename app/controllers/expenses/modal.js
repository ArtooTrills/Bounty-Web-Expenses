import ModalController from '../modal';

var ExpensesModalController = ModalController.extend({
  users: [],

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
