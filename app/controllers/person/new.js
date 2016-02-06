import Ember from 'ember';

export default Ember.Controller.extend({
        init      : function()
                    {
                      this.set('person',  Ember.Object.create());
                    },

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

                        addPerson : function()
                                    {
                                      var person = this.store.createRecord('person', {
                                                    person_name   : this.get('person_name'),
                                                    display_name  : this.get('display_name'),
                                                    comment       : this.get('comment'),
                                      });
                                      this.set('person', person);
                                      var _this = this;
                                      if(!this.personIsValid(newPerson)){return;}
                                      person.save().then(function(){
                                        _this.setProperties({
                                                              person_name: '',
                                                              display_name: '',
                                                              comment     : '',
                                                            });
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
