import Ember from 'ember';

//Basic radio Component
var RadioButtonComponent = Ember.Component.extend({
  tagName : "input",
  type : "radio",
  attributeBindings : [ "id", "name", "type", "value", "checked:checked" ],
  classNameBindings: ["checked:active"],
  click : function() {
    this.set("selected", this.get("value-object"));
  },
  checked : function() {
    return this.get("value-object.id") === this.get("selected.id");
  }.property('selected')
});

export default RadioButtonComponent;
