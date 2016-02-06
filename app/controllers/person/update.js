import Ember from 'ember';

export default Ember.Controller.extend({
  personIsValid   : function(person)
                    {
                      var isValid = true;
                      ['person_name', 'display_name', 'comment'].forEach(function(field) {
                        if (!person.get(field)) {
                          isValid = false;
                          return isValid;
                        }
                      }, this);
                      return isValid;
                    },
  actions         : {

                        updatePerson : function()
                                    {
                                      newPerson = this.store.createRecord('person', {
                                                    person_name   : this.get('person_name'),
                                                    display_name  : this.get('display_name'),
                                                    comment       : this.get('comment'),
                                      });
                                      this.set('person', newPerson)
                                      if(!this.personIsValid(newPerson)){return;}
                                      newPerson.save();
                                      this.setProperties({
                                                            person_name: '',
                                                            display_name: '',
                                                            comment     : '',
                                                          });
                                      this.transitionTo('person');
                                      },
                      closePopup   :  function()
                                      {
                                        this.transitionToRoute('person');
                                      }
                      }
});
