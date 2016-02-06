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

                        updatePerson : function(person)
                                    {
                                      if(!this.personIsValid(person)){return;}
                                      var _this= this;
                                      person.save().then(function(){
                                        _this.transitionToRoute('person');
                                      }).catch(function(){
                                        alert('Sorry There is some error.');
                                      });
                                      },
                      closePopup   :  function()
                                      {
                                        this.transitionToRoute('person');
                                      }
                      }
});
