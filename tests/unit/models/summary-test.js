import { moduleForModel, test } from 'ember-qunit';

moduleForModel('summary', 'Unit | Model | summary', {
  // Specify the other units that are required for this test.
needs: ['model:person', 'model:expence']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
