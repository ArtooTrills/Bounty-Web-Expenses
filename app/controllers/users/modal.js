import ModalController from '../modal';

var UsersModalController = ModalController.extend({
  actions: {
    create: function(){
      var user = this.store.createRecord('user',{});
      this.set('model', user);
    }
  }
});

export default UsersModalController;
