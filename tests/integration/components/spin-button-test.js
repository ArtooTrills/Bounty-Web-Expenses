import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('spin-button', 'Integration | Component | spin button', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{spin-button}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#spin-button buttonText="template block text" isLoading=false}}

    {{/spin-button}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');

  this.render(hbs`
    {{#spin-button buttonText="template block text" isLoading=true}}

    {{/spin-button}}
  `);

  assert.equal(this.$().text().trim(), '');
});
