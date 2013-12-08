App = Em.Application.create();

App.ApplicationAdapter = DS.LSAdapter.extend();


App.ApplicationController = Ember.Controller.extend({
	format:"DDMMYYYY",
	date: null,
	formattedDate: function(){
		var date = this.get('date'),
		format = this.get('format');
		return moment(date).format(format)
	}.property('date', 'format')
});

Ember.Handlebars.registerBoundHelper('formattedDate', function(value) {
	return moment(value).format('Do - MMM - YYYY');
});