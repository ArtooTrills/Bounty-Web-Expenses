App.CheckBoxComponent = Ember.Component.extend({
	tagName: "input",
	type: "checkbox",
	attributeBindings: ["id", "name", "type", "value", "checked:checked" ],
	click: function() {
		var checkedVals = this.get('checkedVals');
		if (checkedVals == null)
			checkedVals = [];
		checkedVals.addObject(this.$().val());
	},
	checked: function() {
		var checkedVals = this.get('checkedVals');
		if (checkedVals == null)
			return false;
		else 
			return checkedVals.contains(this.get("value")); 
		
	}.property('checkedVals')
});

Em.Handlebars.helper('check-box', App.CheckBoxComponent);
