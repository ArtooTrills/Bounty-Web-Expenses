App.RadioButtonComponent = Ember.Component.extend({
	tagName: "input",
	type: "radio",
	attributeBindings: ["id", "name", "type", "value", "checked:checked" ],
	click: function() {
		this.set("selection", this.$().val());
	},
	checked: function() {

		//used in edit expenses to retrieve the model's payer id and select it
		if(!this.get("selection")) {
			var payer = this.get('parentView.targetObject').get('payer');
			//if payer is already set, (in case of editing)
			if(payer)
				this.set("selection", payer.id);
		}

		return this.get("value") === this.get("selection");
	}.property('selection')
});

Em.Handlebars.helper('radio-button', App.RadioButtonComponent);
