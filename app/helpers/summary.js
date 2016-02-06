import Ember from 'ember';

export function paidToPerson (params){
  var person = params[0];
  var expences = params[1];
  var count = 0;
  expences.forEach(function(expence){
    expence.get('paidTo');
    if(expence.get('payee').get('content').id == person.id)
    {

    }
  });
  return count;
}

export default Ember.Helper.helper(paidToPerson);
