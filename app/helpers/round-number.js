import Ember from 'ember';

export function roundNumber(params/*, hash*/) {
  return Math.round(params[0]);
}

export default Ember.Helper.helper(roundNumber);
