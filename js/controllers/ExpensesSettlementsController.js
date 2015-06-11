App.ExpensesSettlementsController = Ember.ObjectController.extend({
    actions: {
        save: function(model) {
            var settlements = this.get('model.settlements');
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