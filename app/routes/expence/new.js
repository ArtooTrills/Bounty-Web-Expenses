import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
         return this.store.findAll('person');
 },
 setupController: function(controller, model) {
        this.controller.set('person', model);
    }
});
