import Ember from 'ember';

var ModalController = Ember.ObjectController.extend({
  // actions
  actions: {
    edit: function(model) {
      this.set('model', model);
    },

    save: function() {
      var self = this;
      this.get('model').save().then(function(){
        self.send('close');
      });
    },

    close: function() {
      this.get('model').rollback();
      this.send("closeModal");
    }
  }
});

export default ModalController;
