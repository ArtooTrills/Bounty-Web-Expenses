import Ember from 'ember';

export default Ember.Controller.extend({
  init        : function()
                {
                  this.set('person',  this.store.findAll('person'));
                  this.set('expence', this.store.createRecord('expence',{}));
                },
  isValid     : function(expence)
                {
                    var isValid = true;

                    ['date', 'amount', 'payee', 'paidTo', 'description'].forEach(function(field) {
                        if (!expence[field])
                        {
                          isValid = false;
                          return isValid;
                        }
                    });
                    return isValid;
                  },
  actions      :  {
                      addExpences : function()
                                    {
                                      var expence = this.get('expence');

                                      expence.set('date', this.get('date'));
                                      expence.set('amount', this.get('amount'));
                                      expence.set('payee', this.get('payee'));
                                      expence.set('description', this.get('description'));
                                      // expence.set('paidTo', expence.paidTo);

                                      if(!this.isValid(expence)){return;}
                                      var _this = this;
                                      expence.save().then(function(){
                                        _this.setProperties({
                                                    date            : '',
                                                    amount          : '',
                                                    payee           : '',
                                                    paidTo          : '',
                                                    description     : '',
                                        });
                                        _this.set('expence', expence);
                                        _this.transitionToRoute('expence');
                                      });

                                    },
                      changePayee : function()
                                    {
                                      console.log(this);
                                      var model = this.get('expence');
                                      model.set('payee', this.get('payee'));
                                    },
                      addPaidTo  :  function(newSelection)
                                    {
                                      var model = this.get('expence');
                                      var paidTo = [];
                                      newSelection.forEach(function(person){
                                          paidTo.push(person);
                                      });
                                      model.set('paidTo', paidTo);
                                    },
                    closePopup   :  function()
                                    {
                                      this.transitionToRoute('expence');
                                    }
                  }
});
