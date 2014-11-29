import Ember from 'ember';

var CheckBoxComponent = Ember.Component.extend({
	tagName: "input",
	type: "checkbox",
	attributeBindings: ["id", "name", "type", "value", "checked:checked" ],
	click: function() {
		var selected = this.get('selected') || [];
		selected.addObject(this.get('value-object'));
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
