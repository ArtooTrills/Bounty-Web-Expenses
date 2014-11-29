import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return Ember.RSVP.hash({
      expenses: this.store.find('expense'),
      user: this.store.find('user'),
    });
  },

  setupController: function(controller, models) {
    controller.set('model', models);

    controller.send('totals');
    controller.send('payments');
  }
});
