import Ember from 'ember';

export default Ember.Controller.extend({
        init      : function()
                    {

                    },
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

                        addPerson : function(action)
                                    {
                                      var person = {
                                                    person_name   : this.get('person_name'),
                                                    display_name  : this.get('display_name'),
                                                    comment       : this.get('comment'),
                                      };
                                      if(!this.personIsValid(person))
                                      {
                                        this.set('isLoading', false);
                                      }
                                      else{
                                        var _this = this;
                                        person = this.store.createRecord('person', person)
                                        person.save().then(function(){
                                          if(action != 'new')
                                          {
                                            _this.transitionToRoute('person');
                                          }
                                          else
                                          {
                                            _this.setProperties({
                                                                  person_name: '',
                                                                  display_name: '',
                                                                  comment     : '',
                                                                });
                                          }
                                          _this.set('isLoading', false)
                                        }).catch(function(){
                                          alert('error occurred')
                                        });
                                      }


                                      },
                      closePopup   :  function()
                                      {
                                        this.transitionToRoute('person');
                                      }
                      }
});
