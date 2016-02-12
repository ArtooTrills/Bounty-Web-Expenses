import Ember from 'ember';

export default Ember.Controller.extend({
  actions:{
    updatePerson : function(person){
      this.transitionToRoute('person.update', person.id);
    }
}
});
