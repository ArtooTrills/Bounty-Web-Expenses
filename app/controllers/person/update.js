import Ember from 'ember';

export default Ember.Controller.extend({
  personIsValid   : function(person)
                    {
                      var isValid = true;
                      ['person_name', 'display_name', 'comment'].forEach(function(field) {
                        if (!person[field]) {
                          isValid = false;
                          return isValid;
                        }
                      }, this);
                      return isValid;
                    },
  actions         : {

                        updatePerson : function(person)
                                    {
                                      
                                      if(!this.personIsValid(person))
                                      {
                                        this.set('isLoading', false);
                                        return;
                                      }
                                      var _this= this;
                                      person.save().then(function()
                                        {
                                          _this.transitionToRoute('person');
                                          _this.set('isLoading', false);
                                        }
                                      ).catch(function(){
                                        alert('Sorry There is some error.');
                                      });
                                      },
                      closePopup   :  function()
                                      {
                                        this.transitionToRoute('person');
                                      }
                      }
});
