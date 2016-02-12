import { moduleFor, test } from 'ember-qunit';

moduleFor('route:expence/new', 'Unit | Route | expence/new', {
  // Specify the other units that are required for this test.
  needs: ['controller:person']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
