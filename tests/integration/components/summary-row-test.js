import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('summary-row', 'Integration | Component | summary row', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
  var person = {
    id : 1,
    display_name : "a"
  }
  var person1 = {
    id : 2,
    display_name : "b"
  }
  var payment = {
    id: 1,
    payee : person,
    payer : person1,
    amount : 20
  }
  this.set('payment', payment);
  this.render(hbs`{{summary-row payment=payment tagName=""}}`);

  assert.equal(this.$('td').text().trim(), 'ba20');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#summary-row}}

    {{/summary-row}}
  `);

  assert.equal(this.$().text().trim(), 'NaN');
});
