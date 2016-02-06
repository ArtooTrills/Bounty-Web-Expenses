import Ember from 'ember';

export function totalSpent (params){
  var person = params[0];
  var expences = params[1];
  var totalAmount = 0;
  expences.forEach(function(expence){

    if(expence.get('payee').get('content').id == person.id)
    {
      totalAmount += +(expence.get('amount'));
    }
  });
  return totalAmount;
}

export default Ember.Helper.helper(totalSpent);
