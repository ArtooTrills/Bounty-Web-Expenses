import Ember from 'ember';

export default Ember.Controller.extend({
    actions : {
                pay : function(_from, _to, expenceMap)
                      {
                        this.set('isLoding', true);
                        var expence = expenceMap[_from][_to];
                        if(expence == 0)
                        {
                          return;
                        }
                        var payee = expence < 0 ? _from : _to;
                        var payer = expence > 0 ? _from : _to;
                        var _this = this;
                        Ember.RSVP.hash({
                             payee  : this.store.find('person', payee),
                             payer  : this.store.find('person', payer)
                         }).then(function(person){
                          console.log(person.payee);
                          var date            = new Date();
                          var formattedDate   = date.getFullYear()+"-"+("0"+ (date.getMonth()+1) ).substr(-2,2)+"-"+("0"+ (date.getDate()) ).substr(-2,2)
                          var expence         = _this.store.createRecord('expence', {
                            date              : formattedDate,
                            amount            : Math.abs(expenceMap[_from][_to]),
                            payee             : person.payee,
                            description       : 'settlement',
                            paidTo            : [person.payer]
                          });
                          console.log(expence.get('payee'));
debugger;
                          expence.save().then(function(){

                            _this.set('isLoading', false);
                          }).catch(function(){
                            alert('error occurred')
                          });
                        })

                        // expence.set('paidTo', expence.paidTo);

                        // if(!this.isValid(expence))
                        // {
                        //   this.set('isLoading', false);
                        //   return;
                        // }



                        console.log(expence);
                      }
    }
});
