import Ember from 'ember';

export default Ember.Controller.extend({
  init        : function()
                {
                  this.set('person',  this.store.findAll('person'));
                  this.set('expence', {});
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
                      addExpences : function(action)
                                    {
                                      var expence = this.get('expence');

                                      expence.date              =  this.get('date');
                                      expence.amount            = this.get('amount');
                                      expence.payee             = this.get('payee');
                                      expence.description       = this.get('description');
                                      // expence.set('paidTo', expence.paidTo);

                                      if(!this.isValid(expence))
                                      {
                                        this.set('isLoading', false);
                                        return;
                                      }
                                      var _this = this;
                                      expence= this.store.createRecord('expence', expence)
                                      expence.save().then(function(){
                                        if(action != 'new')
                                        {
                                          _this.transitionToRoute('expence');
                                        }
                                        else
                                        {
                                          _this.setProperties({
                                                      date            : '',
                                                      amount          : '',
                                                      payee           : '',
                                                      paidTo          : '',
                                                      description     : '',
                                          });
                                          _this.set('expence', {});
                                        }
                                        _this.set('isLoading', false);
                                      }).catch(function(){
                                        alert('error occurred')
                                      });

                                    },
                      changePayee : function()
                                    {
                                      console.log(this);
                                      var model = this.get('expence');
                                      model.payee = this.get('payee');
                                    },
                      addPaidTo  :  function(newSelection)
                                    {
                                      var model = this.get('expence');
                                      var paidTo = [];
                                      newSelection.forEach(function(person){
                                          paidTo.push(person);
                                      });
                                      model.paidTo = paidTo;
                                    },
                    closePopup   :  function()
                                    {
                                      this.transitionToRoute('expence');
                                    }
                  }
});
