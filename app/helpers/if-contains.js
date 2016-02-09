import Ember from 'ember';

export function ifContains(params, options) {
  if(params[0] && params[0][params[1]])
  {
     return true;
  }
  return false;
}

export default Ember.Helper.helper(ifContains);
