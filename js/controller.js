App.FriendsController = Ember.Controller.extend({
	isEditing: false,		
  actions: {
    addFriend: function() {
		this.set('isEditing',true);
    },

    done: function() {
    	this.set('isEditing', false);
    }  
  }

});

App.ExpensesController = Em.Controller.extend({
	isEditing: false,

	actions: {
		addExpense: function() {
			this.set('isEditing', true);
		},

		done: function() {
			this.set('isEditing',false);
		}
	}
});