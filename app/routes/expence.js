import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
         expence: this.store.findAll('expence'),
         person: this.store.findAll('person')
     });
 },
 setupController: function(controller, model) {
        this.controller.set('expence', model.expence);
        this.controller.set('person', model.person);
    }
});
