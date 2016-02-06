import Ember from 'ember';

export default Ember.Route.extend({
  model: function(id) {
   return this.store.findById('person', id.id);
 }
 ,
 setupController: function( controller, model) {
        this.controller.set('person', model);
    }
});
