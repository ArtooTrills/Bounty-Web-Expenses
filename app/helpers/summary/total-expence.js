import Ember from 'ember';

export function totalExpence (params){
  var person = params[0];
  var expences = params[1];
  var totalAmount = 0;
  expences.forEach(function(expence){
      totalAmount += +(expence.get('amount'));
  });
  return totalAmount;
}


export default Ember.Helper.helper(totalExpence);
