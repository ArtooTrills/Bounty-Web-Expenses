import Ember from 'ember';

export function getKeys(params) {
  var object    = params[0];
  var subObject_key = params[1];
  if(!subObject_key)
  {
    return Object.keys(object);
  }
  else{
    return Object.keys(object[subObject_key]);
  }
}

export default Ember.Helper.helper(getKeys);
