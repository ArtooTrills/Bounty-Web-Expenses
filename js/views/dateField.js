App.DateField = Ember.TextField.extend({
	type: 'date',

	date: function(key, date) {
	    if (date) {
	      if (typeof date === "string")
		date = new Date(date);
	      this.set('value', date.toISOString().substring(0, 10));
	    } else {
	      value = this.get('value');
	      if (value) { 
		date = new Date(value);
	      } else {
		date = new Date();
	      	this.set('value', date.toISOString().substring(0, 10));
	      }
	    }
	    return date;
	}.property('value')
});
