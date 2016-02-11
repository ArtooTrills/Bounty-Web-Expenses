import Ember from 'ember';

export function roundNumber(params/*, hash*/) {
  console.log(Math.round(params[0]));
  return Math.round(params[0]);
}

export default Ember.Helper.helper(roundNumber);
