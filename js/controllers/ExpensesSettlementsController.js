App.ExpensesSettlementsController = Ember.ObjectController.extend({
    payables : {},
    actions: {
        save: function(model) {
            var settlements = this.get('model.settlements');
            var self = this;
            var promise = this.store.find('settlement',model.id).then(function(settlement){
                settlement.set('settlements',settlements);
                settlement.save();
            });
        },
        deleteRecord: function() {
            this.get('model').deleteRecord();
            this.get('model').save();
        }
    }
});