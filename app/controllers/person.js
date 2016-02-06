import Ember from 'ember';

export default Ember.Controller.extend({
  actions:{
    updatePerson : function(person){
      debugger
      this.transitionToRoute('person.update', person.id);
    }
}
});
