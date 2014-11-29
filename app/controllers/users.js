import Ember from 'ember';

var filterBy = Ember.computed.filterBy;
var notEmpty = Ember.computed.notEmpty;
var empty = Ember.computed.empty;

var UsersController = Ember.ArrayController.extend({
  itemController: 'user',
  needs: ['users/modal'],

  // Selected users list
  selected: filterBy('content', 'isSelected', true),
  // set this flag to `true` if any user is selected
  anySelected: notEmpty('selected.[]'),
  // set this flag to `true` if no user is selected
  notSelected: empty('selected.[]'),

  // Toggle all user selections
  toggleSelections: function(key, value) {
    var users = this.get('model');
    if (arguments.length === 1) {
      return users.isEvery('isSelected');
    }
    users.setEach('isSelected', value);
    return value;
  }.property('content.@each.isSelected'),

  // Actions
  actions: {
    // remove selected users
    removeSelected: function() {
      var users = this.get('selected');
      users.invoke('deleteRecord').invoke('save');
    },
    // create user
    create: function() {
      this.get('controllers.users/modal').send('create');
      this.send('openModal', 'users.modal');
    },

  }
});

export default UsersController;
