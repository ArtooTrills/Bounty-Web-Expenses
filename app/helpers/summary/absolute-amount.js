import Ember from 'ember';

export function summaryAbsoluteAmount(params/*, hash*/) {
  var expenceMap = params[2];
  var _from = params[0];
  var _to = params[1];
  return Math.round(Math.abs(expenceMap[_from][_to]));
}

export default Ember.Helper.helper(summaryAbsoluteAmount);
