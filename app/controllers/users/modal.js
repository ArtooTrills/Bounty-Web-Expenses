import ModalController from '../modal';

var UsersModalController = ModalController.extend({
  // validation for model
  notValid: function() {
    return !this.get('model.name') || !this.get('model.displayName');
  }.property('model.name', 'model.displayName'),

  actions: {
    create: function(){
      var user = this.store.createRecord('user',{});
      this.set('model', user);
    }
  }
});

export default UsersModalController;
