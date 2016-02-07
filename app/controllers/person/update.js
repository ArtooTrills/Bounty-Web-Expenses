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
  isLoading       : false,
  actions         : {

                        updatePerson : function(person)
                                    {
                                      if(this.isLoading)
                                      {
                                        return;
                                      }
                                      else
                                      {
                                        this.isLoading = true;
                                      }
                                      if(!this.personIsValid(person))
                                      {
                                        this.isLoading = false;
                                        return;
                                      }
                                      var _this= this;
                                      person.save().then(function()
                                        {
                                          _this.transitionToRoute('person');
                                          _this.isLoading = false;
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
