import Ember from 'ember';

var NumberField = Ember.TextField.extend({
  type: 'number',
  attributeBindings: ['min', 'max', 'step']
});

export default NumberField;
