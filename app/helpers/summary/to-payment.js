import Ember from 'ember';

export function summaryToPayment(params/*, hash*/) {
  var _from               = params[0];
  var _to                 = params[1];
  var persons             = params[2];
  var expence             = params[3];
  var person_name           = "";
  if(expence[_from][_to] < 0)
  {
    persons.get('content').forEach(function(person){
      if(person.id === _from)
      {
        person_name =  person.getRecord().get('display_name');
        return;
      }
    });

  }
  else
  {
    persons.get('content').forEach(function(person){
      if(person.id === _to)
      {
        person_name =  person.getRecord().get('display_name');
        return;
      }
    });
  }
  return person_name;
}

export default Ember.Helper.helper(summaryToPayment);
