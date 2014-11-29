import Ember from 'ember';

var CheckBoxComponent = Ember.Component.extend({
  tagName: "input",
  type: "checkbox",
  attributeBindings: ["id", "name", "type", "value", "checked:checked" ],
  click: function() {
    var selected = this.get('selected') || [];
    var obj = this.get('value-object');
    if (selected.contains(obj)) {
      selected.removeObject(obj);
    } else {
      selected.addObject(obj);
    }
  },
  checked: function() {
    var selected = this.get('selected');
    if (!selected) {
      return false;
    }
    return selected.contains(this.get("value-object"));
  }.property('selected')
});

export default CheckBoxComponent;
