import Ember from 'ember';

export default Ember.Controller.extend({
  actions:{
    createGroup: function(){
      var newGroup = this.store.createRecord('group', {
        group_name: this.get('group_name')
      });
      newGroup.save();
      this.setProperties({
        group_name: ''
      });
    }
  }
});
