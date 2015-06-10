App.SettlementsController = Ember.ObjectController.extend({
    actions: {
        save: function(id) {
            //this.get('model').save();
            var promise = this.store.find('settlement',id).then(function(settlements){
                console.log(settlements);
                settlements.save();
            });
        },
        deleteRecord: function() {
            this.get('model').deleteRecord();
            this.get('model').save();
        }
    }
});