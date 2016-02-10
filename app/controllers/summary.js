import Ember from 'ember';

export default Ember.Controller.extend({
  nameChanged: function() {
    console.log("New name! New name!");
  }.observes('model.payemts'),
    actions : {
                pay : function(payment)
                      {
                        this.set('isLoding', true);
                        var _this = this;
                          console.log(payment.payee);
                          var date            = new Date();
                          var formattedDate   = date.getFullYear()+"-"+("0"+ (date.getMonth()+1) ).substr(-2,2)+"-"+("0"+ (date.getDate()) ).substr(-2,2)
                          var expence         = _this.store.createRecord('expence', {
                            date              : formattedDate,
                            amount            : payment.get('amount'),
                            payee             : payment.get('payer'),
                            description       : 'settlement',
                            paidTo            : [payment.get('payee')]
                          });
                          console.log(expence.get('payee'));
                          expence.save().then(function(){
                            _this.set('isLoading', false);
                            payment.deleteRecord();
                          }).catch(function(){
                            alert('error occurred')
                          });
                        console.log(expence);
                      }
    }
});
