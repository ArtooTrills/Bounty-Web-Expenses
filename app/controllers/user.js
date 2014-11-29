import Ember from 'ember';

var UserController = Ember.ObjectController.extend({
  needs: ['users/modal'],
  isSelected: false,

  // Actions
  actions: {
    // remove user
    remove: function() {
      var user = this.get('model');
      user.deleteRecord();
      user.save();
    },

    // edit user
    edit: function() {
      this.send('openModal', 'users.modal');

      var user = this.get('model');
      this.get('controllers.users/modal').send('edit', user);
    }
  }
});

export default UserController;
