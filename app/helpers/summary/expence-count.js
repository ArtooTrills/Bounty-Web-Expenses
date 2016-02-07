import Ember from 'ember';

export function expenceCount (params){
  var person = params[0];
  var expences = params[1];
  var count = 0;
  expences.forEach(function(expence){

    if(expence.get('payee').get('content').id === person.id)
    {
      count ++;
    }
  });
  return count;
}


export default Ember.Helper.helper(expenceCount);
