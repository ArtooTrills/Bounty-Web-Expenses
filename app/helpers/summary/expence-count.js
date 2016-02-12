import Ember from 'ember';

export function expenceCount (params){

  var person = params[0];
  var expences = params[1];
  var count = 0;
  var arrayConstructor = [].constructor;
  var objectConstructor = {}.constructor;
  if(expences.constructor == arrayConstructor)
  {
    expences.forEach(function(expence){
      if(expence.constructor != objectConstructor)
      {
        if(expence.get('payee').get('content').id === person.id)
        {
          count ++;
        }
      }
      else
      {
        if(expence.payee.id === person.id)
        {
          count ++;
        }
      }
    });
  }

  return count;
}


export default Ember.Helper.helper(expenceCount);
