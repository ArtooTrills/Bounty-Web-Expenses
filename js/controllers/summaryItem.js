App.SummaryItemController = Ember.ObjectController.extend({
	balanceColor: (function() {
		if(parseFloat(this.get('balance')) >= 0) 
			return "positive";
		else
			return "negative";
	}).property('balance')
});
