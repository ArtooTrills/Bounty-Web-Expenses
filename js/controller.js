App.FriendsController = Ember.Controller.extend({
	isEditing: false,		
  actions: {
    add_friend: function() {
		this.set('isEditing',true);
    },

    cancel: function() {
		this.set('isEditing',false);
    },

    addFriend: function(){
    	var name = this.get('name');
    	var scrName = this.get('screenName');
    	var description = this.get('description');

    	var newFriend = this.store.createRecord('friend', {
    		name: name,
    		screenName: scrName,
    		description: description
    	});

    	this.set('name','');
    	this.set('screenName','');
    	this.set('description','');

    	newFriend.save();
    	this.set('isEditing',false);
    }  
  }

});

App.ExpensesController = Ember.Controller.extend({
	isEditing: false,

	actions: {
		add_expense: function() {
			this.set('isEditing', true);
		},

		cancel: function() {
			this.set('isEditing',false);
		},

		addExpense: function(){
		var date = this.get('date');
    	var description = this.get('description');
    	var whoPaid = this.get('whoPaid');
    	var amount = this.get('amount');
    	var forWhom = this.get('forWhom');

    	var newExpense = this.store.createRecord('expense', {
    		date: date,
    		description: description,
    		whoPaid: whoPaid,
    		amount: amount,
    		forWhom: forWhom
    	});

    	this.set('date','');
    	this.set('description','');
    	this.set('whoPaid','');
    	this.set('amount','');
    	this.set('forWhom','');

    	newExpense.save();
    	
	}
  }
});