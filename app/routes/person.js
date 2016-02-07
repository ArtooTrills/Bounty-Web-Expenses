import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
   return this.store.findAll('person');
 },
  actions: {
    loading: function(transition, originRoute) {
      // displayLoadingSpinner();

      // Return true to bubble this event to `FooRoute`
      // or `ApplicationRoute`.
      return true;
    }
});
