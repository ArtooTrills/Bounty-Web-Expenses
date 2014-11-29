import Ember from 'ember';

export default Ember.Route.extend({

  // actions
  actions: {
    openModal: function(modal) {
      this.render(modal, {
        into: 'application',
        outlet: 'modal'
      });
      var self = this;
      setTimeout(function(){
        Ember.$('.modal')
          .modal('show')
          .on('hide.bs.modal', function(){
            self.send('close');
          });
      }, 100);
    },

    closeModal: function() {
      return this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    }
  }
});
