import { roundNumber } from '../../../helpers/round-number';
import { module, test } from 'qunit';

module('Unit | Helper | round number');

// Replace this with your real tests.
test('it works', function(assert) {
  let result = roundNumber([42.44343]);
  assert.ok(result == 42);
});
test('it works', function(assert) {
  let result = roundNumber([-42.54343]);
  assert.ok(result == -43);
});
