App.ModalView = Ember.View.extend({
	didInsertElement: function() {
		Ember.run.next(this, function()	{
			this.$('.modal, .modal-backdrop').addClass('in');
		});
	},
	layoutName: 'modal',
	actions: {
		close: function() {
			var view = this;
			this.$('.modal, .modal-backdrop').one("transitioned", function(ev) {
				view.controller.send('close');
			});
			this.$('.modal, .modal-backdrop').removeClass('in');
		},

		save: function() {
			var name = this.get('name');
		}
	}
});
