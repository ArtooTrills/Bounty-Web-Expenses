import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
   return this.store.findAll('expence');
 },
 setupController: function( model) {
        this.controller.set('model', this.store.findAll('expence'));
        this.controller.set('person', this.store.findAll('person'));
    }
});
