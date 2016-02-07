import Ember from 'ember';


export function totalOwes (params){
  var person = params[0];
  var expences = params[1];
  var totalAmount = 0;
  expences.forEach(function(expence){
    var isPayee = expence.get('payee').get('content').id === person.id ? true : false;
    expence.get('paidTo').get('content').forEach(function(temp_person){
       if(temp_person.id === person.id )
       {
         totalAmount += (+expence.get('amount')/expence.get('paidTo').get('length'));
       }
    });
  });
  return Math.round(totalAmount);
}
export default Ember.Helper.helper(totalOwes);
