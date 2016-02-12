import { expenceCount } from '../../../../helpers/summary/expence-count';
import { module, test } from 'qunit';

module('Unit | Helper | summary/expence count');
// Replace this with your real tests.
var person = {
  id : 1
}
var expence1 = {
  payee : person,
};
var expences = [];
expences.push(expence1);
test('getting number of times person paid', function(assert) {
  let result = expenceCount([person, expences]);
  assert.equal(result, 1);

});
var expence2 = {
  payee : person,
};
var newExpences = [];
newExpences.push(expence1);
newExpences.push(expence2);
test('getting number of times person paid', function(assert) {
  let result = expenceCount([person, newExpences]);
  assert.equal(result, 2);

});
