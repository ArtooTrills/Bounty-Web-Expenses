import Ember from 'ember';

export default Ember.Controller.extend({
  nameChanged: function() {
    console.log("New name! New name!");
  }.observes('payments'),
    actions : {
                pay : function(payment)
                      {
                        this.set('isLoding', true);
                        var _this = this;
                        var date            = new Date();
                        var formattedDate   = date.getFullYear()+"-"+("0"+ (date.getMonth()+1) ).substr(-2,2)+"-"+("0"+ (date.getDate()) ).substr(-2,2)
                        var expence         = _this.store.createRecord('expence', {
                          date              : formattedDate,
                          amount            : payment.get('amount'),
                          payee             : payment.get('payer'),
                          description       : 'settlement',
                          paidTo            : [payment.get('payee')]
                        });
                        expence.save().then(function(){
                          payment.deleteRecord();
                          _this.set('isLoading', false);
                        }).catch(function(e){
                          alert('error occurred')
                          console.log(e);
                        });
                      }
     }
});
