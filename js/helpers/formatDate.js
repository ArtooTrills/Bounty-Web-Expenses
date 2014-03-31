Ember.Handlebars.registerBoundHelper('formatDate', function(date, format) {
	return moment(date).format(format);
});
